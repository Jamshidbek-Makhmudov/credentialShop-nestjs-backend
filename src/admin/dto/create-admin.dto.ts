import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";


export class CreateAdminDto {
    
    @ApiProperty({example:'@salima23', description:"Admin usernami"})
    @IsString()
    @IsNotEmpty()
    username:string;

    
    @ApiProperty({example:'Uzbek1$t0n', description:"Admin paroli"})
    @IsNotEmpty()
    @IsStrongPassword()
    @MinLength(4)
    password:string;

    @ApiProperty({example:'Uzbek1$t0n', description:"Admin qayta kiritadigan paroli"})
    @IsNotEmpty()
    @IsStrongPassword()
    confirim_password:string;

    
    @ApiProperty({example:'salima@mail.uz', description:"Admin emaili"})
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @ApiProperty({example:'+998881112233', description:"Admin telefon raqami"})
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber:string;


}
