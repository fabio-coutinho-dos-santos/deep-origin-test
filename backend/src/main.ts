import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GeneralExceptionsFilter } from './@shared/general-exceptions.filter';
import { ENVIRONMENT } from './@shared/enums';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as yaml from 'yaml';
import { API_PREFIX } from './@shared/constants';

async function bootstrap() {
  Logger.log(`Environment: ${process.env.NODE_ENV}`, 'Bootstrap');

  const app = await NestFactory.create(AppModule, { cors: true });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const swaggerFilePath = './docs/api.yaml';

  const swaggerDocument = yaml.parse(fs.readFileSync(swaggerFilePath, 'utf8'));
  app.use(
    `/${API_PREFIX}/doc`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  );

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
