import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';
import { ApiProperty } from "@nestjs/swagger";
import {  IsDateString, IsEmail, IsNotEmpty, 
    IsOptional, 
    IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @ApiProperty({example:'Salima', description:"Foydalanuvchi ismi"})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    first_name?:string;
    
    @ApiProperty({example:'Hakimova', description:"Foydalanuvchi familiyasi"})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    last_name?:string;
    
    @ApiProperty({example:'@salima23', description:"Foydalanuvchi usernami"})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username?:string;
    
    @ApiProperty({example:'Uzbek1$t0n', description:"Foydalanuvchi paroli"})
    @IsNotEmpty()
    @IsStrongPassword()
    @MinLength(4) 
    @IsOptional()
    password?:string;

    @ApiProperty({example:'Uzbek1$t0n', description:"Foydalanuvchi qayta kiritadigan paroli"})
    @IsNotEmpty()
    @IsStrongPassword()
    @IsOptional()
    confirim_password?:string;

    @ApiProperty({example:'chilonzor 12', description:"Foydalanuvchi yashash manzili"})
    @IsNotEmpty()
    @IsStrongPassword()
    @IsOptional()
    address?:string;
     
    @ApiProperty({example:'salima@mail.uz', description:"Foydalanuvchi emaili"})
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?:string;

    @ApiProperty({example:'+998991112233', description:"Foydalanuvchi telefon nomeri"})
    @IsPhoneNumber('UZ')
    @IsOptional()
    phone?:string;

    @ApiProperty({example:'AS12344', description:"Foydalanuvchi passporti"})
    @IsNotEmpty()
    @IsStrongPassword()
    @IsOptional()
    passport?:string;
}
