import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class PhoneAdminDto {
    @ApiProperty({example:'+998981234567', description:"Foydalanuvchi telefon raqami"})
    
    @IsPhoneNumber()
    @IsNotEmpty()
    phone:string;
}