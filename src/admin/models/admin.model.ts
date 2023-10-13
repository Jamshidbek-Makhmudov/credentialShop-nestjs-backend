import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Contract } from '../../contract/models/contract.model';

export enum AdminRole {
  Creater = 'Creater',
  UpdDel = 'UpdDel',
  Seller = 'Seller',
  SuperAdmin = 'SuperAdmin',
}

interface AdminAttrs {
  email: string;
  password: string;
  username: string;
  is_active: boolean;
  hashed_refresh_token: string;
  role: AdminRole;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;


  @ApiProperty({ example: 'admin@mail.uz', description: 'Admin email' })
  @Column({
    type: DataType.STRING,
    //unique: true,
  })
  email: string;

  @ApiProperty({ example: 'Uzbek!$t0n', description: 'Admin paroli' })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ApiProperty({ example: '@admin23', description: 'Admin usernami' })
  @Column({
    type: DataType.STRING,
    //unique: true,
  })
  username: string;

  
  @ApiProperty({
    example: '+998881112233',
    description: 'Admin telefon nomeri',
  })
  @Column({
    type: DataType.STRING,
  })
  phoneNumber: string;

  @ApiProperty({
    example: 'Creater',
    description: 'Admin rollari (Creater, SuperAdmin, Seller)',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: 'false',
  })
  role: AdminRole;

  @ApiProperty({ example: 'false', description: 'Admin activligi' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'dsf7787cvnc9s_kjsjfndf7',
    description: 'Admin hashed refresh tokeni',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  
  @HasMany(()=> Contract)
  contract:Contract[];
}
