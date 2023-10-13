import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHistoryDto {

    @ApiProperty({ example: 12344, description: 'Product narxi' })   
    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    pay: number;
    
    @ApiProperty({ example: '2023-09-08', description: "To'lov qilingan kun" })
    @IsDateString()
    @IsNotEmpty()
    payed_date: Date;
    
    @ApiProperty({ example: 'cartadan', description: "To'lov qilingan usul" })
    @IsString()
    @IsNotEmpty()
    payment_method: string;

    @ApiProperty({ example: 1, description: "Contract id" })
    contract_id:number;
}
