import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  HttpCode,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from './models/product.model';
import { FindProductDto } from './dto/findProduct.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { UpdDelAdminGuard } from '../guards/updDelAdmin.guard';
import { ClientGuard } from '../guards/client.guard';

@ApiTags("Product")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Product yaratish' })
  @ApiResponse({ status: 201, description: 'create product', type: [Product] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(CreateAdminDto)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: any,
  ) {
    return this.productService.create(createProductDto, image);
  }

  @ApiOperation({ summary: 'Product update qilish' })
  @ApiResponse({ status: 201, description: 'update by id', type: [Product] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(UpdDelAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiOperation({ summary: 'Rasm update qilish' })
  @ApiResponse({ status: 201, description: 'update by id image', type: [Post] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(UpdDelAdminGuard)
  @Put('file/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateFile(@Param('id') id: string, @UploadedFile() image: any) {
    return this.productService.updateImage(+id, image);
  }

  @ApiOperation({ summary: "id orqali ko'rish" })
  @ApiResponse({ status: 200, description: 'find by id ', type: [Product] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ClientGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiOperation({ summary: "Productlarni ko'rish" })
  @ApiResponse({
    status: 200,
    description: 'find All product ',
    type: [Product],
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ClientGuard)
  @Post("find")
  findAll(@Body() findProductDto: FindProductDto) {
    return this.productService.findAll(findProductDto);
  }

  @ApiOperation({ summary: "id orqali productni o'chirish" })
  @ApiResponse({ status: 200, description: 'delete by id', type: Number })
  @HttpCode(HttpStatus.OK)
  @UseGuards(UpdDelAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.removeProduct(+id);
  }
}
