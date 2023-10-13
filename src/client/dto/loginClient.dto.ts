
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, isEmail } from "class-validator";

export class LoginClientDto {
    
    @ApiProperty({example:'salima@mail.uz', description:"Foydalanuvchi emaili"})
    @IsEmail()
    @IsNotEmpty()
    email:string;

    
    @ApiProperty({example:'Uzbek1$t0n', description:"Foydalanuvchi  paroli"})
    @IsNotEmpty()
    @IsStrongPassword()
    password:string
}