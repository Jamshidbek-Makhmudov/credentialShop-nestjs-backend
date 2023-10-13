import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../../categories/models/category.model';
import { Favorite } from '../../favorites/models/favorite.model';
import { Contract } from '../../contract/models/contract.model';

interface ProductAttrs {
  name: string;
  quantity: number;
  image: string;
  description: string;
  price: number;
  price_months: number;
  months: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'samsung 7', description: 'Product nomi' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: '34', description: 'Product soni' })
  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;

  @ApiProperty({ example: 'rasm.jpg', description: 'Product rasmi' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({
    example: 'BU telefon sifatli',
    description: "Product haqida ma'lumot",
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({ example: '3456000', description: 'Product narxi' })
  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @ApiProperty({ example: '400000', description: 'Product oylik narxi' })
  @Column({
    type: DataType.INTEGER,
  })
  price_months: number;

  @ApiProperty({ example: '8', description: "Product narxini to'lash muddati" })
  @Column({
    type: DataType.INTEGER,
  })
  months: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.BIGINT, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  category_id: bigint;

  @BelongsTo(() => Category)
  category: Category;


  @HasMany(()=> Favorite)
  favorites:Favorite[]

  
  @HasMany(()=> Contract)
  contract:Contract[];
}
