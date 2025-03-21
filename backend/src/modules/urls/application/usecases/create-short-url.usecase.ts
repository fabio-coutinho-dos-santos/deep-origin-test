import {
  Inject,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { REPOSITORIES } from '../../../../@shared/constants';
import { IUrlsRepository } from '../repositories/urls.repository.interface';
import { UrlsSchema } from '../../infra/entities/urls.schema';
import { Url } from '../../domain/urls';
import { ValidateUrlService } from '../services/validate-url-service';

@Injectable()
export class CreateShortUrl {
  @Inject(REPOSITORIES.URLS)
  private urlsRepository: IUrlsRepository;

  @Inject(ValidateUrlService)
  private validateUrlService: ValidateUrlService;

  async execute(url: string, userId: number): Promise<Url> {
    try {
      const valid = await this.validateUrlService.isUrlValid(url);

      if (!valid) {
        throw new UnprocessableEntityException('Invalid URL');
      }

      const shorten = await this.createUniqueSlugUrl();
      const newUrl = new Url(url, shorten, userId);
      return await this.urlsRepository.createOrUpdate(newUrl);
    } catch (error) {
      Logger.error(error, CreateShortUrl.name);
      throw error;
    }
  }

  private async createUniqueSlugUrl(): Promise<string> {
    const slug = Math.random().toString(36).substring(2, 7);
    const slugExists: UrlsSchema = await this.urlsRepository.findOne({
      where: {
        shortened: slug,
      },
    });
    if (slugExists) {
      Logger.log(`Slug ${slug} already exists, creating a new one`);
      return this.createUniqueSlugUrl();
    }
    return slug;
  }
}
