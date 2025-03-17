import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_PREFIX } from './@shared/constants';
import { ValidationPipe } from '@nestjs/common';
import { GeneralExceptionsFilter } from './@shared/general-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GeneralExceptionsFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
