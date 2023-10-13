import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import {Response} from "express"
import { BadRequestException, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { LoginClientDto } from './dto/loginClient.dto';
import { FindClientDto } from './dto/findClient.dto';
import { Op } from 'sequelize';


@Injectable()
export class ClientService {
  constructor(@InjectModel(Client) private readonly clientRepo: typeof Client,
  private readonly mailService: MailService,
  private readonly jwtService: JwtService){}

  async getTokens(client: Client) {
    const jwtPlayload = {
      id: client.id,
      is_active: client.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPlayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPlayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_KEY_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async registration(createClientDto: CreateClientDto, res: Response) {
    const client = await this.clientRepo.findOne({
      where: { username: createClientDto.username },
    });

    if (client) {
      throw new BadRequestException('Username already exists!');
    }

    if (createClientDto.password !== createClientDto.confirim_password) {
      throw new BadRequestException('Password is not match');
    }

    const hashed_password = await bcrypt.hash(createClientDto.password, 7);
    const newClient = await this.clientRepo.create({
      ...createClientDto,
      password: hashed_password,
    });

    const token = await this.getTokens(newClient);
    const hashed_refresh_token = await bcrypt.hash(token.refresh_token, 7);

    const uniqeKey: string = v4();

    const updateClient = await this.clientRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqeKey,
      },
      { where: { id: newClient.id }, returning: true },
    );

    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    try {
      await this.mailService.sendUserConfirmation(updateClient[1][0]);
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'User registered',
      user: updateClient[1][0],
      token,
    };

    return response;
  }

  async activate(link: string) {
    console.log("link", link);
    
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const updateClient = await this.clientRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    console.log("---", updateClient);
    
    if (!updateClient[1][0]) {
      throw new BadRequestException('User already activated.');
    }

    const response = {
      message: 'User activated successfully',
      user: updateClient,
    };

    return response;
  }

  async login(loginClientDto: LoginClientDto, res: Response) {
    const { email, password } = loginClientDto;
    const client = await this.clientRepo.findOne({ where: { email } });

    if (!client) {
      throw new UnauthorizedException('User not registered');
    }

    if (!client.is_active) {
      throw new BadRequestException('User is not active');
    }

    const isMatchPass = await bcrypt.compare(password, client.password);

    if (!isMatchPass) {
      throw new UnauthorizedException('User not registered(pass)');
    }

    const tokens = await this.getTokens(client);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateClient = await this.clientRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: client.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    const response = {
      message: 'Client logged in',
      user: updateClient[1][0],
      tokens,
    };

    return response;
  }

  async logout(refreshToken: string, res: Response) {
    console.log('service', refreshToken);

    const ClientData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!ClientData) {
      throw new ForbiddenException('Client not found');
    }

    const updatedClient = await this.clientRepo.update(
      { hashed_refresh_token: null },
      { where: { id: ClientData.id }, returning: true },
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out successfully',
      user: updatedClient[1][0],
    };

    return response;
  }

  async refreshToken(client_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);

    if (client_id != decodedToken['id']) {
      throw new BadRequestException('client not found');
    }

    const client = await this.clientRepo.findOne({ where: { id: client_id } });
    if (!client || !client.hashed_refresh_token) {
      throw new BadRequestException('user not found');
    }

    const tokentMatch = await bcrypt.compare(
      refreshToken,
      client.hashed_refresh_token,
    );
    if (!tokentMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const token = await this.getTokens(client);
    const hashed_refresh_token = await bcrypt.hash(token.refresh_token, 7);

    const updateClient = await this.clientRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: client.id }, returning: true },
    );

    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    const response = {
      message: 'Refresh token successfully',
      user: updateClient[1][0],
      token,
    };

    return response;
  }

  async findAll(findClientDto: FindClientDto) {
    let where = {};
    if (findClientDto.first_name) {
      where['first_name'] = { [Op.like]: `%${findClientDto.first_name}%` };
    }

    if (findClientDto.last_name) {
      where['last_name'] = { [Op.like]: `%${findClientDto.last_name}%` };
    }

    if (findClientDto.username) {
      where['username'] = { [Op.like]: `%${findClientDto.username}%` };
    }

    if (findClientDto.email) {
      where['email'] = { [Op.like]: `%${findClientDto.email}%` };
    }

    if (findClientDto.phone) {
      where['phone'] = { [Op.like]: `%${findClientDto.phone}%` };
    }


    const clients = await Client.findAll({ where });
    if (!clients) {
      throw new BadRequestException('Client not found');
    }

    return clients;
  }

  async update( id:number, updateClientDto:UpdateClientDto) {
    const client = await this.clientRepo.update(updateClientDto, {where:{id}, returning:true})
    return client
  }

  getOne(id:number) {
    return this.clientRepo.findByPk(id)
  }

  
}
