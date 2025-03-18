import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { REPOSITORIES } from '../../../../@shared/constants';
import { IUrlsRepository } from '../repositories/urls.repository.interface';

@Injectable()
export class RedirectUrl {
  @Inject(REPOSITORIES.URLS)
  private readonly urlsRepository: IUrlsRepository;

  async execute(shortened: string): Promise<string> {
    try {
      const urlStored = await this.urlsRepository.findOne({
        where: {
          shortened,
        },
      });

      if (!urlStored) {
        throw new NotFoundException('URL not found');
      }

      urlStored.hits += 1;
      await this.urlsRepository.update(urlStored, urlStored.id);

      return urlStored.original;
    } catch (e) {
      Logger.error(
        `Error on trying redirect url ${shortened}: ${e}`,
        RedirectUrl.name,
      );
      throw e;
    }
  }
}
