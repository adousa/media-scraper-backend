import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable validation for all requests
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
