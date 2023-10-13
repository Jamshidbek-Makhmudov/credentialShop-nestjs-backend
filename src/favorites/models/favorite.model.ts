import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Client } from "../../client/models/client.model";
import { Product } from "../../product/models/product.model";
import { ApiProperty } from "@nestjs/swagger";

interface FavoriteAttr {
    user_id: number;
    product_id: number;
    status:boolean
}

@Table({tableName:"favorite"})
export class Favorite extends Model<Favorite, FavoriteAttr> {
    
    @ApiProperty({example:1, description:"Client id"})
    @ForeignKey(()=> Client)
    @Column({type:DataType.BIGINT, onDelete:'CASCADE', onUpdate:'CASCADE'})
    user_id:bigint

    @BelongsTo(()=>Client)
    user:Client;

    
    @ApiProperty({example:1, description:"Product id"})
    @ForeignKey(()=> Product)
    @Column({type:DataType.BIGINT, onDelete:'CASCADE', onUpdate:'CASCADE'})
    product_id:bigint

    @BelongsTo(()=>Product)
    product:Product;
    
    
    @ApiProperty({example:'true', description:"Favorites activligi"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue:true,
    })
    status: boolean;
    
}
