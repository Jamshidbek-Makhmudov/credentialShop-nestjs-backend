import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite } from './models/favorite.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Favorite]), JwtModule.register({})],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
