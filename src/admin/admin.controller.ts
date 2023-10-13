import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { FindAdminDto } from './dto/find-admin.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { PhoneAdminDto } from './dto/phone-admin.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { AdminGuard } from '../guards/admin.guard';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { SuperAdminGuard } from '../guards/superAdmin.guard';
import { selfAdminGuard } from '../guards/selfAdmin.guards';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Register Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  registration(
    @Body() createUserDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: 'Activate Admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  @ApiOperation({ summary: 'Login Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Logout Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'RefreshToken Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'send OTP' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('/otp')
  newOtp(@Body() phoneAdminDto: PhoneAdminDto) {
    return this.adminService.newOTP(phoneAdminDto);
  }

  @ApiOperation({ summary: 'verify OTP' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('/verify')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.adminService.verifyOtp(verifyOtpDto);
  }

  @ApiOperation({ summary: 'All Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @UseGuards(SuperAdminGuard)
  @Post('find')
  findAll(@Body() findAdminDto: FindAdminDto) {
    return this.adminService.findAll(findAdminDto);
  }

  @ApiOperation({ summary: 'Update by id' })
  @ApiResponse({ status: 201, type: Admin })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'find One' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'update role by id' })
  @ApiResponse({ status: 201, type: Admin })
  @HttpCode(HttpStatus.OK)
  @UseGuards(SuperAdminGuard)
  @Patch('role/:id')
  UpdateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.adminService.updateRole(+id, updateRoleDto);
  }
}
