import { FindOneOptions } from 'typeorm';

export interface IRepository<T> {
  create(data: T): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(input: FindOneOptions): Promise<T>;
  update(data: Partial<T>, id: number): Promise<T>;
}
