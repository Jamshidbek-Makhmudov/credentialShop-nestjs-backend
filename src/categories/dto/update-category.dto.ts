import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({example:'Telefonlar', description:"Category name"})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string
}
