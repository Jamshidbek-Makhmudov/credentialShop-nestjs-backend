import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Otp } from './otp.model';

@Module({
    imports:[SequelizeModule.forFeature([Otp])],
    exports:[],
})
export class OtpModule {
}
