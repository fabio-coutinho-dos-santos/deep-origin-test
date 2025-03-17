import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GeneralExceptionsFilter } from './@shared/general-exceptions.filter';
import { ENVIRONMENT } from './@shared/enums';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  Logger.log(`Environment: ${process.env.NODE_ENV}`, 'Bootstrap');

  const app = await NestFactory.create(AppModule, { cors: true });

  process.env.NODE_ENV == ENVIRONMENT.PRODUCTION &&
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GeneralExceptionsFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
