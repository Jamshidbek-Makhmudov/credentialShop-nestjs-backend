import { PartialType } from '@nestjs/swagger';
import { CreateUserCardDto } from './create-user_card.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  IsOptional, IsString } from "class-validator";

export class UpdateUserCardDto extends PartialType(CreateUserCardDto) {
    @ApiProperty({example:'Humo kard', description:"Foydalanuvchi karta nomi"})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @ApiProperty({example:8890123456, description:"Foydalanuvchi karta nomeri"})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    card_number?: string;

    @IsNotEmpty()
    card_id:number
}
