import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class FavoriteDto {
  @ApiProperty({ example: '1', description: 'Foydalanuvchi id' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 'Hakimova', description: 'Product id' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ example: 'true', description: 'statusi' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
