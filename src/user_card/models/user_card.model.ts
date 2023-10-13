import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from '../../client/models/client.model';

interface UserCardAttrs {
  name: string;
  card_number: string;
}

@Table({ tableName: 'user_card' })
export class UserCard extends Model<UserCard, UserCardAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Humo kard', description: 'Karta nomi' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: '99883450634', description: 'Karta raqami' })
  @Column({
    type: DataType.STRING,
  })
  card_number: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @ForeignKey(() => Client)
  @Column({ type: DataType.BIGINT, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user_id: bigint;

  @BelongsTo(() => Client)
  user: Client;
}
