import { Inject, Injectable, Logger } from '@nestjs/common';
import { REPOSITORIES } from '../../../../@shared/constants';
import { IUrlsRepository } from '../repositories/urls.repository.interface';

@Injectable()
export class DeleteUrl {
  @Inject(REPOSITORIES.URLS)
  private urlsRepository: IUrlsRepository;
  async execute(id: number): Promise<void> {
    try {
      await this.urlsRepository.delete(id);
    } catch (e) {
      Logger.error(`Error on trying delete url ${id}: ${e}`, DeleteUrl.name);
      throw e;
    }
  }
}
