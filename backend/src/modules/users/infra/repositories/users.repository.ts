import { InjectRepository } from '@nestjs/typeorm';
import { IUsersRepository } from '../../application/repositories/users.repositories.interface';
import { UsersSchema } from '../entities/users.schema';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../../domain/users';
import { UsersMapper } from '../mappers/users.mapper';

export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(UsersSchema)
    private readonly urlsRepository: Repository<UsersSchema>,
  ) {}

  async findOne(input: FindOneOptions<UsersSchema>): Promise<User> {
    const url = await this.urlsRepository.findOne(input);

    if (!url) {
      return null;
    }

    return UsersMapper.toDomain(url);
  }

  async update(data: Partial<User>, id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async create(data: User): Promise<User> {
    const urlsSchema = UsersMapper.toPersistence(data);
    const createdUrl = await this.urlsRepository.save(urlsSchema);
    return UsersMapper.toDomain(createdUrl);
  }

  async findAll(): Promise<User[]> {
    const urls = await this.urlsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return urls.map((url) => UsersMapper.toDomain(url));
  }
}
