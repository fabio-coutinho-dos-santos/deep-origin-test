import { InjectRepository } from '@nestjs/typeorm';
import { IUrlsRepository } from '../../application/repositories/urls.repository.interface';
import { Url } from '../../domain/urls';
import { UrlsSchema } from '../entities/urls.schema';
import { FindOneOptions, Repository } from 'typeorm';
import { UrlsMapper } from '../mappers/urls.mapper';

export class UrlsRepository implements IUrlsRepository {
  constructor(
    @InjectRepository(UrlsSchema)
    private readonly urlsRepository: Repository<UrlsSchema>,
  ) {}

  async findOne(input: FindOneOptions): Promise<Url> {
    const url = await this.urlsRepository.findOne(input);
    if (!url) {
      return null;
    }
    return UrlsMapper.toDomain(url);
  }

  async update(data: Partial<Url>, id: number): Promise<Url> {
    throw new Error('Method not implemented.');
  }

  async create(data: Url): Promise<Url> {
    const urlsSchema = UrlsMapper.toPersistence(data);
    console.log(urlsSchema);
    const createdUrl = await this.urlsRepository.save(urlsSchema);
    console.log(createdUrl);
    return UrlsMapper.toDomain(createdUrl);
  }

  async findAll(): Promise<Url[]> {
    const urls = await this.urlsRepository.find();
    return urls.map((url) => UrlsMapper.toDomain(url));
  }
}
