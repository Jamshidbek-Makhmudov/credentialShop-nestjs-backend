import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { History } from './models/history.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([History]), JwtModule.register({})],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
