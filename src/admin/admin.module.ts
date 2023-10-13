import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { BotService } from '../bot/bot.service';
import { BotModule } from '../bot/bot.module';
import { OtpModule } from '../otp/otp.module';
import { Otp } from '../otp/otp.model';

@Module({
  imports:[SequelizeModule.forFeature([Admin,Otp ]),
  JwtModule.register({}),
  MailModule,
  OtpModule,
  BotModule

  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
