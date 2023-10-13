import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface OtpAttrs {
    id: string;
    otp: string;
    expiration_time: Date;
    verified: boolean;
    check: string;
}


@Table({tableName:'otp'})
export class Otp extends Model<Otp, OtpAttrs> {
    @ApiProperty({example:'112983-sdf9-sd3-sf4', description:'otp uuid'})
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
    })
    id:string;

    @ApiProperty({example:'1978', description:'OTP'})
    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    otp:string;

    @ApiProperty({example:'2023-02-27T08:10:10', description:'expiration_time'})
    @Column({
        type: DataType.DATE,
        allowNull:false,
    })
    expiration_time:Date;
    
    
    @ApiProperty({example:'false', description:'verified'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false,
    })
    verified:boolean;

    @ApiProperty({example:'false', description:'user status'})
    @Column({
        type: DataType.STRING,
    })
    check:string;

}
