import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './models/client.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginClientDto } from './dto/loginClient.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { selfClientGuard } from '../guards/selfClient.guard';
import { FindClientDto } from './dto/findClient.dto';
import { ClientGuard } from '../guards/client.guard';
import { SuperAdminGuard } from '../guards/superAdmin.guard';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Register Client' })
  @ApiResponse({ status: 201, type: Client })
  @Post('signup')
  registration(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.registration(createClientDto, res);
  }

  @ApiOperation({ summary: 'Activate Client' })
  @ApiResponse({ status: 200, type: [Client] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.clientService.activate(link);
  }

  @ApiOperation({ summary: 'Login Client' })
  @ApiResponse({ status: 200, type: Client })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginClientDto: LoginClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.login(loginClientDto, res);
  }

  @ApiOperation({ summary: 'Logout Client' })
  @ApiResponse({ status: 200, type: Client })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ClientGuard)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'RefreshToken Client' })
  @ApiResponse({ status: 200, type: Client })
  @HttpCode(HttpStatus.OK)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'All Client' })
  @ApiResponse({ status: 200, type: Client })
  @HttpCode(HttpStatus.OK)
  @UseGuards(SuperAdminGuard)
  @Post('find')
  findAll(@Body() findClientDto: FindClientDto) {
    return this.clientService.findAll(findClientDto);
  }

  @ApiOperation({ summary: 'Updated by Id' })
  @ApiResponse({ status: 201, type: Client })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @ApiOperation({ summary: 'Self profile' })
  @ApiResponse({ status: 200, type: Client })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Get('profil/:id')
  getOne(@Param('id') id: string) {
    return this.clientService.getOne(+id);
  }
}
