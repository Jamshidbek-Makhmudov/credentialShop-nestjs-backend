import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  
    @ApiProperty({example:'Telefonlar', description:"Category name"})
    @IsString()
    @IsNotEmpty()
    name: string
}
