import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable validation for all requests
  app.useGlobalPipes(new ValidationPipe());
  if (process.env.APP_MODE === 'DEVELOPMENT') {
    app.enableCors();
  }
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
