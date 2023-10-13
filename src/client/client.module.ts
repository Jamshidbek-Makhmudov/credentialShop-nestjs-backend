import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[SequelizeModule.forFeature([Client]),
  JwtModule.register({}),
  MailModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
