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

  async delete(id: number): Promise<void> {
    await this.urlsRepository.delete(id);
  }

  async findByUser(userId: number): Promise<Url[]> {
    const urls = await this.urlsRepository.find({
      where: {
        userId: userId,
      },
      order: {
        updatedAt: 'DESC',
        createdAt: 'DESC',
        hits: 'DESC',
      },
    });
    return urls.map((url) => UrlsMapper.toDomain(url));
  }

  async findOne(input: FindOneOptions<UrlsSchema>): Promise<Url> {
    const url = await this.urlsRepository.findOne(input);

    if (!url) {
      return null;
    }

    return UrlsMapper.toDomain(url);
  }

  async update(data: Partial<Url>, id: number): Promise<Url> {
    await this.urlsRepository.update(id, UrlsMapper.toPersistence(data));
    const url = await this.urlsRepository.findOne({
      where: {
        id,
      },
    });

    if (!url) {
      return null;
    }

    return UrlsMapper.toDomain(url);
  }

  async create(data: Url): Promise<Url> {
    const urlsSchema = UrlsMapper.toPersistence(data);
    const createdUrl = await this.urlsRepository.save(urlsSchema);
    return UrlsMapper.toDomain(createdUrl);
  }

  async findAll(): Promise<Url[]> {
    const urls = await this.urlsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return urls.map((url) => UrlsMapper.toDomain(url));
  }

  async createOrUpdate(data: Url): Promise<Url> {
    const urlStored = await this.urlsRepository.findOne({
      where: {
        original: data.original,
        userId: data.userId,
      },
    });

    if (urlStored) {
      urlStored.shortened = data.shortened;
      return this.update(urlStored, urlStored.id);
    } else {
      const urlsSchema = UrlsMapper.toPersistence(data);
      const createdUrl = await this.urlsRepository.save(urlsSchema);
      return UrlsMapper.toDomain(createdUrl);
    }
  }
}
