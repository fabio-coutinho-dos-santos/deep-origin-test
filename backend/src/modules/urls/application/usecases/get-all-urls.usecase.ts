import { Inject, Injectable, Logger } from '@nestjs/common';
import { REPOSITORIES } from '../../../../@shared/constants';
import { IUrlsRepository } from '../repositories/urls.repository.interface';
import { Url } from '../../domain/urls';

@Injectable()
export class GetAllUrls {
  @Inject(REPOSITORIES.URLS)
  private urlsRepository: IUrlsRepository;

  async execute(userId: number): Promise<Url[]> {
    try {
      return this.urlsRepository.findByUser(userId);
    } catch (e) {
      Logger.error(
        `Error on trying get all urls for user ${userId}: ${e}`,
        GetAllUrls.name,
      );
      throw e;
    }
  }
}
