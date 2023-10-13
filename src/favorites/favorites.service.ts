import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './models/favorite.model';
import { where } from 'sequelize';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorite) private favoriteRepo: typeof Favorite) {}

  create(createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteRepo.create(createFavoriteDto);
  }


  findAll(id: number) {
    return this.favoriteRepo.findOne({ where: { user_id: id, status: true } });
  }

  async remove(id: number, product_id:number) {
    const remove = await this.favoriteRepo.update({ status: false }, { where: { id:product_id }, returning:true });
    if(!remove) {
      throw new BadRequestException('Product dont found')
    } 
    return 1
  }
}
