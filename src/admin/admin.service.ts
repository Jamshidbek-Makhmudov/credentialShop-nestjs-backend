import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin, AdminRole } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { LoginAdminDto } from './dto/login-admin.dto';
import { FindAdminDto } from './dto/find-admin.dto';
import { Op } from 'sequelize';
import { PhoneAdminDto } from './dto/phone-admin.dto';
import * as otpGenerator from 'otp-generator';
import { BotService } from '../bot/bot.service';
import { Otp } from '../otp/otp.model';
import { AddMinutesToDate } from '../helpres/addMinutes';
import { dates, decode, encode } from '../helpres/crypto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly botService: BotService,
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
  ) {}

  async getTokens(admin: Admin) {
    const jwtPlayload = {
      id: admin.id,
      is_active: admin.is_active,
      role: admin.role,
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

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const user = await this.adminRepo.findOne({
      where: { username: createAdminDto.username },
    });

    console.log('dto', createAdminDto);

    if (user) {
      throw new BadRequestException('Username already exists!');
    }

    if (createAdminDto.password !== createAdminDto.confirim_password) {
      throw new BadRequestException('Password is not match');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepo.create({
      ...createAdminDto,
      password: hashed_password,
    });

    console.log('newAdmin', newAdmin);

    const token = await this.getTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(token.refresh_token, 7);

    const uniqeKey: string = v4();

    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqeKey,
      },
      { where: { id: newAdmin.id }, returning: true },
    );

    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    try {
      await this.mailService.sendAdminConfirmation(updateAdmin[1][0]);
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'User registered',
      user: updateAdmin[1][0],
      token,
    };

    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const updateAdmin = await this.adminRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    console.log('Admin', updateAdmin[1][0].is_active);

    if (!updateAdmin[1][0]) {
      throw new BadRequestException('User already activated.');
    }

    const response = {
      message: 'Admin activated successfully',
      user: updateAdmin,
    };

    return response;
  }

  async login(loginadminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginadminDto;
    const admin = await this.adminRepo.findOne({ where: { email } });

    if (!admin) {
      throw new UnauthorizedException('Admin not registered');
    }

    if (!admin.is_active) {
      throw new BadRequestException('Admin is not active');
    }

    const isMatchPass = await bcrypt.compare(password, admin.password);

    if (!isMatchPass) {
      throw new UnauthorizedException('Admin not registered(pass)');
    }

    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: admin.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    const response = {
      message: 'Admin logged in',
      user: updateAdmin[1][0],
      tokens,
    };

    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const AdminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!AdminData) {
      throw new ForbiddenException('Admin not found');
    }

    const updatedAdmin = await this.adminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: AdminData.id }, returning: true },
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      user: updatedAdmin[1][0],
    };

    return response;
  }

  async refreshToken(admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);

    if (admin_id != decodedToken['id']) {
      throw new BadRequestException('Admin not found');
    }

    const admin = await this.adminRepo.findOne({ where: { id: admin_id } });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('Admin not found');
    }

    const tokentMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );
    if (!tokentMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const token = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(token.refresh_token, 7);

    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: admin.id }, returning: true },
    );

    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    const response = {
      message: 'Refresh token successfully',
      user: updateAdmin[1][0],
      token,
    };

    return response;
  }

  async newOTP(phoneAdminDto: PhoneAdminDto) {
    const phone_number = phoneAdminDto.phone;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const isSend = await this.botService.sendOTP(phone_number, otp);

    if (!isSend) {
      throw new HttpException(
        "Avval Botdan ro'yxatdan o'ting",
        HttpStatus.BAD_REQUEST,
      );
    }

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.destroy({
      where: { check: phone_number },
    });

    const newOtp = await this.otpRepo.create({
      id: v4(),
      otp,
      expiration_time,
      check: phone_number,
    });

    const details = {
      timestamp: now,
      check: phone_number,
      otp_id: newOtp.id,
    };

    const encoded = await encode(JSON.stringify(details));
    return { status: 'Success', Details: encoded };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, otp, check } = verifyOtpDto;
    const currentdate = new Date();
    const decoded = await decode(verification_key);
    const details = JSON.parse(decoded);

    if (details.check != check) {
      throw new BadRequestException('OTP bu raqamga yuborilmagan');
    }

    const result = await this.otpRepo.findOne({
      where: { id: details.otp_id },
    });

    if (result != null) {
      if (!result.verified) {
        if (dates.compare(result.expiration_time, currentdate)) {
          if (otp === result.otp) {
            const user = await this.adminRepo.findOne({
              where: { phoneNumber: check },
            });
            console.log('phone=', user);

            if (user) {
              const updateAdmin = await this.adminRepo.update(
                { role: AdminRole.SuperAdmin },
                { where: { id: user.id }, returning: true },
              );

              await this.otpRepo.update(
                { verified: true },
                { where: { id: details.otp_id } },
              );

              const responce = {
                message: 'Admin updated as SuperAdmin',
                user: updateAdmin[1][0],
              };

              return responce;
            } else {
              throw new BadRequestException("Bunday foydalanuchi yo'q");
            }
          } else {
            throw new BadRequestException('OTP is not match');
          }
        } else {
          throw new BadRequestException('OTP expired');
        }
      } else {
        throw new BadRequestException('OTP already used');
      }
    } else {
      throw new BadRequestException("Bunday OTP yo'q");
    }
  }

  async findAll(findAdminDto: FindAdminDto) {
    let where = {};
    if (findAdminDto.email) {
      where['email'] = { [Op.like]: `%${findAdminDto.email}%` };
    }

    if (findAdminDto.phone) {
      where['phone'] = { [Op.like]: `%${findAdminDto.phone}%` };
    }

    if (findAdminDto.username) {
      where['username'] = { [Op.like]: `%${findAdminDto.username}%` };
    }

    const admin = await this.adminRepo.findAll({ where });
    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    return admin;
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findByPk(id);
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    return admin;
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    let update;
    
    const admin = await this.adminRepo.findByPk(id);
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    
    if(admin.role){
      
      update = await this.adminRepo.update(updateRoleDto, {
        where: { id },
        returning: true,
      });
    } else {
      throw new BadRequestException("Admin is active")
    }
    
    return update;
  }
}
