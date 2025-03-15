import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSchema } from '../infra/entities/users.schema';
import { REPOSITORIES } from 'src/@shared/constants';
import { UsersRepository } from '../infra/repositories/users.repository';
import { CreateUser } from '../application/usecases/create-user';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersSchema])],
  controllers: [UsersController],
  providers: [
    {
      provide: REPOSITORIES.USERS,
      useClass: UsersRepository,
    },
    CreateUser,
  ],
})
export class UsersModule {}
