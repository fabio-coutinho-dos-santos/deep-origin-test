import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from 'src/@shared/constants';
import { IUrlsRepository } from '../repositories/urls.repository.interface';

@Injectable()
export class DeleteUrl {
  @Inject(REPOSITORIES.URLS)
  private urlsRepository: IUrlsRepository;
  async execute(id: number): Promise<void> {
    await this.urlsRepository.delete(id);
  }
}
