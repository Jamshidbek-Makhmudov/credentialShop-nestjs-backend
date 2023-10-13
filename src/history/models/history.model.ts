import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Contract } from '../../contract/models/contract.model';

interface HistoryAttrs {
  pay: number;
  payed_date: Date;
  payment_method: string;
}

@Table({ tableName: 'history' })
export class History extends Model<History, HistoryAttrs> {
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
  pay: number;

  
  @ApiProperty({ example: '2023-09-08', description: "To'lov qilingan kun" })
  @Column({
    type: DataType.DATE,
  })
  payed_date: Date;

  @ApiProperty({ example: 'cartadan', description: "To'lov qilingan usul" })
  @Column({
    type: DataType.STRING,
  })
  payment_method: string;

  
  @ForeignKey(() => Contract)
  @Column({ type: DataType.BIGINT, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  contract_id: bigint;

  @BelongsTo(() => Contract)
  contract: Contract;

  
}
