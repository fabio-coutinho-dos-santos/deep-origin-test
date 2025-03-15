import { Inject, Injectable, Logger } from '@nestjs/common';
import { BCRYPT, REPOSITORIES } from 'src/@shared/constants';
import { IUsersRepository } from '../repositories/users.repositories.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/users';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CreateUser {
  @Inject(REPOSITORIES.USERS)
  private usersRepository: IUsersRepository;

  async execute(input: CreateUserDto): Promise<User> {
    try {
      const { name, email, password } = input;
      const hashedPassword = await bcrypt.hash(password, BCRYPT.SALT_ROUNDS);
      const newUser = new User(name, email, hashedPassword);
      return await this.usersRepository.create(newUser);
    } catch (error) {
      Logger.error(error);
      throw new Error(error);
    }
  }
}
