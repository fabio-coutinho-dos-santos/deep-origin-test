import { IRepository } from 'src/@shared/repository.inteface';
import { User } from '../../domain/users';

export interface IUsersRepository extends IRepository<User> {}
