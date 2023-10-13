import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateFileDto extends PartialType(CreateProductDto) {
  @ApiProperty({ example: 'rasm.jpg', description: 'Product rasmi' })
  @IsString()
  @IsNotEmpty()
  photo?: string;
}
