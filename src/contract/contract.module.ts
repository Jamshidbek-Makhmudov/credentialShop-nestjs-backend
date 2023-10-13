import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract } from './models/contract.model';
import { JwtModule } from '@nestjs/jwt';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [SequelizeModule.forFeature([Contract]), JwtModule.register({})],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
