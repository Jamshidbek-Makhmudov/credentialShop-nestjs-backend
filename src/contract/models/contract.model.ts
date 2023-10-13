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
import { Client } from '../../client/models/client.model';
import { Product } from '../../product/models/product.model';
import { Admin } from '../../admin/models/admin.model';
import { History } from '../../history/models/history.model';

interface ContractAttrs {
  price: number;
  payed_months: number;
  quantity: number;
  pay_date: Date;
  status: boolean;
}

@Table({ tableName: 'contract' })
export class Contract extends Model<Contract, ContractAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 12344, description: 'Product narxi' })
  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @ApiProperty({ example: 3000, description: "Product oylik to'lovi" })
  @Column({
    type: DataType.INTEGER,
  })
  payed_months: number;

  @ApiProperty({ example: 34, description: 'Productlar soni' })
  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;

  @ApiProperty({
    example: '2023-09-07',
    description: "Productni narxini to'lash kuni",
  })
  @Column({
    type: DataType.DATE,
  })
  pay_date: Date;

  @ApiProperty({
    example: 'true',
    description: "Productni to'lovi tugagan yoki tugamagani",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  status: boolean;

  @ForeignKey(() => Client)
  @Column({ type: DataType.BIGINT, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  client_id: bigint;

  @BelongsTo(() => Client)
  client: Client;

  @ForeignKey(() => Product)
  @Column({ type: DataType.BIGINT, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  product_id: bigint;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Admin)
  @Column({ type: DataType.BIGINT, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  admin_id: bigint;

  @BelongsTo(() => Admin)
  admin: Admin;

  @HasMany(()=> History)
  history:History[];
}
