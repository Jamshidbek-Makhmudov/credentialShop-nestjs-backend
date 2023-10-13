import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "../../product/models/product.model";

interface CategoryAttrs {
    name: string
}

@Table({tableName:"category"})
export class Category extends Model<Category, CategoryAttrs> {
    @ApiProperty({example:1, description:'Unikal Id'})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({example:'Telefonlar', description:"Category name"})
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @HasMany(()=> Product)
    products:Product[];

}
