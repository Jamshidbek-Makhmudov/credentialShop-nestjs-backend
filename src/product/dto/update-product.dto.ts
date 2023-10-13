import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ example: 'samsung 7', description: 'Product nomi' })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ example: '34', description: 'Product soni' })
  @IsNumber()
  @IsNotEmpty()
  quantity?: number;

  @ApiProperty({
    example: 'BU telefon sifatli',
    description: "Product haqida ma'lumot",
  })
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({ example: '3456000', description: 'Product narxi' })
  @IsNumber()
  @IsNotEmpty()
  price?: number;

  @ApiProperty({ example: '400000', description: 'Product oylik narxi' })
  @IsNumber()
  @IsNotEmpty()
  price_months?: number;

  @ApiProperty({ example: '8', description: "Product narxini to'lash muddati" })
  @IsNumber()
  @IsNotEmpty()
  months?: number;
}
