import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3003;

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('/api');
    app.use(cookieParser());

    const config = new DocumentBuilder()
      .setTitle("Muddatli to'lov magazin")
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('Nestjs, Postrgress, Sequelize')
      .build();

    const documnet = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, documnet);

    app.listen(PORT, () => {
      console.log(`Server ${PORT} da ishga tushdi`);
    });
    console.log(new Date());
    
  } catch (error) {
    console.log(error);
  }
};

start();
