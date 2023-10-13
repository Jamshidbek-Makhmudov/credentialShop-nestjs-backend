import { Injectable } from '@nestjs/common';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserCard } from './models/user_card.model';

@Injectable()
export class UserCardService {
  constructor(@InjectModel(UserCard) private userCardRepo: typeof UserCard) {}

  create(createUserCardDto: CreateUserCardDto) {
    return this.userCardRepo.create(createUserCardDto);
  }

  findAll() {
    return this.userCardRepo.findAll({ include: { all: true } });
  }

  findOne(name: string) {
    return this.userCardRepo.findOne({ where: { name: name } });
  }

  async update(id: number, updateUserCardDto: UpdateUserCardDto) {
    const userCard = await this.userCardRepo.update(updateUserCardDto, {
      where: { id:updateUserCardDto.card_id },
      returning: true,
    });
    console.log(updateUserCardDto, id);

    return userCard[1][0];
  }

  remove(id: number, delete_id:number) {
    return this.userCardRepo.destroy({ where: { id:delete_id } });
  }
}
