import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserCardDto {
    @ApiProperty({example:'Humo kard', description:"Foydalanuvchi karta nomi"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example:8890123456, description:"Foydalanuvchi karta nomeri"})
    @IsString()
    @IsNotEmpty()
    card_number: string;
}
