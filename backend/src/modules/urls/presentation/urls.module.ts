import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlsSchema } from '../infra/entities/urls.schema';
import { UrlsController } from './urls.controller';
import { REPOSITORIES } from '../../../@shared/constants';
import { UrlsRepository } from '../infra/repositories/urls.repository';
import { CreateShortUrl } from '../application/usecases/create-short-url.usecase';
import { RedirectUrl } from '../application/usecases/redirect-url.usecase';
import { GetAllUrls } from '../application/usecases/get-all-urls.usecase';
import { ValidateUrlService } from '../application/services/validate-url-service';
import { UpdateShortenedUrl } from '../application/usecases/update-shortened-url.usecase';
import { DeleteUrl } from '../application/usecases/delete-url-usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UrlsSchema])],
  controllers: [UrlsController],
  providers: [
    {
      provide: REPOSITORIES.URLS,
      useClass: UrlsRepository,
    },
    CreateShortUrl,
    RedirectUrl,
    GetAllUrls,
    ValidateUrlService,
    UpdateShortenedUrl,
    DeleteUrl,
  ],
})
export class UrlsModule {}
