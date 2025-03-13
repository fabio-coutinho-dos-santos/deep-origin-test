import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlsSchema } from '../infra/entities/urls.schema';
import { UrlsController } from './urls.controller';
import { REPOSITORIES } from 'src/@shared/constants';
import { UrlsRepository } from '../infra/repositories/urls.repository';
import { CreateShortUrl } from '../application/usecases/create-short-url.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UrlsSchema])],
  controllers: [UrlsController],
  providers: [
    {
      provide: REPOSITORIES.URLS,
      useClass: UrlsRepository,
    },
    CreateShortUrl,
  ],
})
export class UrlsModule {}
