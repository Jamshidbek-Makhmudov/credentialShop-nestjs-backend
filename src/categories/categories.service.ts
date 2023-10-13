import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryRepo: typeof Category){}
  
  create(createCategoryDto:CreateCategoryDto ) {
    return this.categoryRepo.create(createCategoryDto);
  }

  findAll() {
    return this.categoryRepo.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.categoryRepo.findByPk(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.update(updateCategoryDto,{
      where:{id},
      returning:true
    });
   
    
    return category[1][0]

  }

  remove(id: number) {
    return this.categoryRepo.destroy({where:{id}});
  }

}
