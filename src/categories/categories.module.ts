import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Category]), JwtModule.register({})],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
