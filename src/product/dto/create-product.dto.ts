import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'samsung 7', description: 'Product nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '34', description: 'Product soni' })
  @IsNumber()
  @Type(()=> Number)
  quantity: number;


  @ApiProperty({
    example: 'BU telefon sifatli',
    description: "Product haqida ma'lumot",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '3456000', description: 'Product narxi' })
  @IsNumber()
  @Type(()=> Number)
  price: number;

  @ApiProperty({ example: '400000', description: 'Product oylik narxi' })
  @IsNumber()
  @Type(()=> Number)
  price_months: number;

  @ApiProperty({ example: '8', description: "Product narxini to'lash muddati" })
  @IsNumber()
  @Type(()=> Number)
  months: number;
}
