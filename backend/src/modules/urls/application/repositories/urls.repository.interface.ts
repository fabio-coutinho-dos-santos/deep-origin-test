import { IRepository } from 'src/@shared/repository.inteface';
import { Url } from '../../domain/urls';

export interface IUrlsRepository extends IRepository<Url> {
  findByUser(userId: number): Promise<Url[]>;
  createOrUpdate(url: Url): Promise<Url>;
}
