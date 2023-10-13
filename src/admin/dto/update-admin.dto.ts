import { PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";


export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    
    @ApiProperty({example:"admin@mail.uz", description: 'Admin email'})
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?:string

    
    @ApiProperty({example:"Uzbek!$t0n", description: 'Admin paroli'})
    @IsStrongPassword()
    @MinLength(6)
    @IsNotEmpty()
    @IsOptional()
    password?: string

    
    @ApiProperty({example:"Uzbek!$t0n", description: 'Admin confirim paroli'})
    @IsStrongPassword()
    @MinLength(6)
    @IsNotEmpty()
    @IsOptional()
    confirim_password?:string;

    
    @ApiProperty({example:"@admin23", description: 'Admin usernami'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username?: string

    
    @ApiProperty({example:"+998881112233", description: 'Admin telefon nomeri'})
    @IsPhoneNumber()
    @IsNotEmpty()
    @IsOptional()
    phoneNumber?: string


}
