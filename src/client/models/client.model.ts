import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserCard } from "../../user_card/models/user_card.model";
import { Product } from "../../product/models/product.model";
import { Favorite } from "../../favorites/models/favorite.model";
import { Contract } from "../../contract/models/contract.model";

interface ClientAttrs {
    first_name:string;
    last_name:string;
    username:string; 
    password:string;
    address:string;
    email:string;
    phone:string;
    passport:string;
    is_active:boolean;
    hashed_refresh_token:string;

}

@Table({tableName:'client'})
export class Client extends Model<Client, ClientAttrs> {
    @ApiProperty({example:1, description:'Unikal Id'})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    
    @ApiProperty({example:'Salima', description:"Foydalanuvchi ismi"})
    @Column({
        type: DataType.STRING,
    })
    first_name: string;

    @ApiProperty({example:'Hakimova', description:"Foydalanuvchi familiyasi"})
    @Column({
        type: DataType.STRING,
    })
    last_name: string;
    
    @ApiProperty({example:'@salima23', description:"Foydalanuvchi usernami"})
    @Column({
        type: DataType.STRING,
    })
    username: string;
    
    @ApiProperty({example:'Uzbek1$t0n', description:"Foydalanuvchi paroli"})
    @Column({
        type: DataType.STRING,
    })
    password: string;
    
    @ApiProperty({example:'chilonzor 12 ', description:"Foydalanuvchi addresi"})
    @Column({
        type: DataType.STRING,
    })
    address: string;
    
    @ApiProperty({example:'salima@mail.uz', description:"Foydalanuvchi emaili"})
    @Column({
        type: DataType.STRING,
        unique:true
    })
    email: string;
   
    @ApiProperty({example:'+998991112233', description:"Foydalanuvchi telefon nomeri"})
    @Column({
        type: DataType.STRING,
    })
    phone: string;

    @ApiProperty({example:'AS12345', description:"Foydalanuvchi passport raqami"})
    @Column({
        type: DataType.STRING,
        
    })
    passport: string;
   

    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false,
    })
    is_active: boolean;
    
    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;

    
    @Column({
        type: DataType.STRING,
    })
    activation_link: string;


    @HasMany(()=> UserCard)
    user_cards:UserCard[];

    @HasMany(()=> Favorite)
    favorites:Favorite[];

    @HasMany(()=> Contract)
    contract:Contract[];

    

}
