import { Inject, Injectable, Logger } from '@nestjs/common';
import { REPOSITORIES } from 'src/@shared/constants';
import { IUrlsRepository } from '../repositories/urls.repository.interface';
import { CreateShortUrlDto } from '../dtos/create-short-url-dto';
import { UrlsSchema } from '../../infra/entities/urls.schema';
import { Url } from '../../domain/urls';

@Injectable()
export class CreateShortUrl {
  @Inject(REPOSITORIES.URLS)
  private urlsRepository: IUrlsRepository;

  async execute(input: CreateShortUrlDto): Promise<Url> {
    const shorten = await this.createUniqueSlugUrl();
    const url = new Url(input.url, shorten, input.userId);
    return await this.urlsRepository.create(url);
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
