import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateFavoriteDto {
    
    @ApiProperty({example:1, description:"Client id"})
    @IsNotEmpty()
    user_id: number;
    
    @ApiProperty({example:1, description:"Product id"})
    @IsNotEmpty()
    product_id: number;

    
    @ApiProperty({example:false, description:"Product activligi"})
    @IsNotEmpty()
    status:boolean
}
