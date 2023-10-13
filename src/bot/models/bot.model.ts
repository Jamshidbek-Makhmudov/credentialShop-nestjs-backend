import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface BotAttrs {
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    status: boolean;
}


@Table({tableName:'bot'})
export class Bot extends Model<Bot, BotAttrs> {
    @ApiProperty({example:12344567, description:'user_id'})
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        allowNull: false,
    })
    user_id:number;

    @ApiProperty({example:'@safiya', description:'user username'})
    @Column({
        type: DataType.STRING,
    })
    username:string;


    @ApiProperty({example:'Jon', description:'user first name'})
    @Column({
        type: DataType.STRING,
    })
    first_name:string;

    @ApiProperty({example:'Doe', description:'user last name'})
    @Column({
        type: DataType.STRING,
    })
    last_name:string;
    
    
    @ApiProperty({example:'+998881112233', description:'user phone number'})
    @Column({
        type: DataType.STRING,
    })
    phone_number:string;

    @ApiProperty({example:'false', description:'user status'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    status:boolean;

}
