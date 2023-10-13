import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty,IsString } from "class-validator";
import { AdminRole } from "../models/admin.model";

export class UpdateRoleDto {
    @ApiProperty({example:"Seller", description:"Admin roli"})
    @IsNotEmpty()
    role: AdminRole;

}