import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { Otp } from './otp/otp.model';
import { MailModule } from './mail/mail.module';
import { Admin } from './admin/models/admin.model';
import { BotModule } from './bot/bot.module';
import { Bot } from './bot/models/bot.model';
import { OtpModule } from './otp/otp.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UserCardModule } from './user_card/user_card.module';
import { CategoriesModule } from './categories/categories.module';
import { Client } from './client/models/client.model';
import { UserCard } from './user_card/models/user_card.model';
import { ProductModule } from './product/product.module';
import { Category } from './categories/models/category.model';
import { FilesModule } from './files/files.module';
import { Product } from './product/models/product.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { ContractModule } from './contract/contract.module';
import { HistoryModule } from './history/history.module';
import { Favorite } from './favorites/models/favorite.model';
import { History } from './history/models/history.model';
import { Contract } from './contract/models/contract.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),

    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [],
      }),
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      models: [
        Admin,
        Bot,
        Otp,
        Client,
        UserCard,
        Category,
        Product,
        Favorite,
        History,
        Contract,
      ],
      autoLoadModels: true,
      logging: true,
    }),

    AdminModule,
    ClientModule,
    OtpModule,
    MailModule,
    BotModule,
    FavoritesModule,
    UserCardModule,
    CategoriesModule,
    ProductModule,
    FilesModule,
    ContractModule,
    HistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
