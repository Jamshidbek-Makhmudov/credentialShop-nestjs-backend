import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContractDto {
  @ApiProperty({ example: 12344, description: 'Product narxi' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 3000, description: "Product oylik to'lovi" })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  payed_months: number;

  @ApiProperty({ example: 34, description: 'Productlar soni' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;

  @ApiProperty({
    example: '2023-09-07',
    description: "Productni narxini to'lash kuni",
  })
  
  @IsNotEmpty()
  pay_date: Date;

  @ApiProperty({ example: 1, description: 'client id' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  client_id: number;

  @ApiProperty({ example: 2, description: 'Product id' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  product_id: number;

  @ApiProperty({ example: 1, description: 'Admin id' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  admin_id: number;
}
