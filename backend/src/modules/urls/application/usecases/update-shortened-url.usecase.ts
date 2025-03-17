import {
  Inject,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { REPOSITORIES } from '../../../../@shared/constants';
import { IUrlsRepository } from '../repositories/urls.repository.interface';
import { UpdateShortenedUrlDto } from '../dtos/update-shortened-url.dto';
import { Url } from '../../domain/urls';

@Injectable()
export class UpdateShortenedUrl {
  @Inject(REPOSITORIES.URLS)
  private urlsRepository: IUrlsRepository;

  async execute(input: UpdateShortenedUrlDto, urlId: number): Promise<Url> {
    try {
      const newShortened = input.shortened;

      const shortenedExists = await this.urlsRepository.findOne({
        where: {
          shortened: newShortened,
        },
      });

      if (shortenedExists) {
        throw new UnprocessableEntityException('Shortened URL already exists');
      }

      await this.urlsRepository.update({ shortened: newShortened }, urlId);

      return await this.urlsRepository.findOne({
        where: {
          shortened: newShortened,
        },
      });
    } catch (error) {
      Logger.error(error, UpdateShortenedUrl.name);
      throw error;
    }
  }
}
