import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FilesService } from './../files/files.service';
import { FindProductDto } from './dto/findProduct.dto';
import { Op } from 'sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepo: typeof Product,
    private readonly filesService: FilesService,
  ) {}

  async create(createProductDto: CreateProductDto, image: any) {
    console.log(image);

    const fileName = await this.filesService.createFile(image);
    
    const post = await this.productRepo.create({
      ...createProductDto,
      image: fileName,
    });
    

    return post;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const post = await this.productRepo.update(updateProductDto, {
      where: { id },
      returning: true,
    });
    return post;
  }

  findOne(id: number) {
    return this.productRepo.findByPk(id, { include: { all: true } });
  }

  async findAll(findProductDto: FindProductDto) {
    let where = {};
    
    if (findProductDto.name) {
      where['name'] = { [Op.like]: `%${findProductDto.name}%` };
    }

    if (findProductDto.description) {
      where['description'] = { [Op.like]: `%${findProductDto.description}%` };
    }

    if (findProductDto.months) {
      where['months'] = { [Op.like]: `%${findProductDto.months}%` };
    }

    if (findProductDto.begin_price && findProductDto.end_price) {
      where[Op.and] = {
        price: {
          [Op.between]: [findProductDto.begin_price, findProductDto.end_price],
        },
      };
    } else if (findProductDto.begin_price) {
      where['price'] = { [Op.gte]: findProductDto.begin_price };
    } else if (findProductDto.end_price) {
      where['price'] = { [Op.lte]: findProductDto.end_price };
    }

    const product = await Product.findAll({ where, include: { all: true }   });
    if (!product) {
      throw new BadRequestException('product not found');
    }

    return product;
  }

  async updateImage(id: number, image: any) {
    const removeFile = await this.removeFile(id);
    console.log('remove', removeFile);

    if (!removeFile) {
      throw new BadRequestException("Don't remove image");
    }

    const createFile = await this.filesService.createFile(image);
    const updateFile = await this.productRepo.update(
      {
        image: createFile,
      },
      { where: { id }, returning: true },
    );
    return updateFile;
  }

  async removeFile(id: number) {
    const post = await this.productRepo.findOne({ where: { id } });

    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.filesService.removeFile(post.image);
  }

  removeProduct(id: number) {
    return this.productRepo.destroy({ where: { id } });
  }
}
