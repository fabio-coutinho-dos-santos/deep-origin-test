import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from 'src/@shared/constants';
import { IUrlsRepository } from '../repositories/urls.repository.interface';
import { Url } from '../../domain/urls';

@Injectable()
export class GetAllUrls {
  @Inject(REPOSITORIES.URLS)
  private urlsRepository: IUrlsRepository;

  async execute(userId: number): Promise<Url[]> {
    return this.urlsRepository.findByUser(userId);
  }
}
