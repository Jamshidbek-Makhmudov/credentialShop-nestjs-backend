import { ApiProperty } from "@nestjs/swagger";
import {  IsDateString, IsEmail, IsNotEmpty, 
    IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateClientDto {
    @ApiProperty({example:'Salima', description:"Foydalanuvchi ismi"})
    @IsString()
    @IsNotEmpty()
    first_name:string;
    
    @ApiProperty({example:'Hakimova', description:"Foydalanuvchi familiyasi"})
    @IsString()
    @IsNotEmpty()
    last_name:string;
    
    @ApiProperty({example:'@salima23', description:"Foydalanuvchi usernami"})
    @IsString()
    @IsNotEmpty()
    username:string;
    
    @ApiProperty({example:'Uzbek1$t0n', description:"Foydalanuvchi paroli"})
    @IsNotEmpty()
    @IsStrongPassword()
    @MinLength(4) 
    password:string;

    @ApiProperty({example:'Uzbek1$t0n', description:"Foydalanuvchi qayta kiritadigan paroli"})
    @IsNotEmpty()
    @IsStrongPassword()
    confirim_password:string;

    @ApiProperty({example:'chilonzor 12', description:"Foydalanuvchi yashash manzili"})
    @IsNotEmpty()
    @IsString()
    address:string;
     
    @ApiProperty({example:'salima@mail.uz', description:"Foydalanuvchi emaili"})
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @ApiProperty({example:'+998991112233', description:"Foydalanuvchi telefon nomeri"})
    @IsPhoneNumber('UZ')
    phone:string;

    @ApiProperty({example:'AS12344', description:"Foydalanuvchi passporti"})
    @IsNotEmpty()
    @IsString()
    passport:string;
 

}
