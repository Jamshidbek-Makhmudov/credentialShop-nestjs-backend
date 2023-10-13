import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FilesModule } from '../files/files.module';
import { JwtModule, } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    FilesModule,
    JwtModule.register({}),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
