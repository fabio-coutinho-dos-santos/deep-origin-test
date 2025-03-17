import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSchema } from '../infra/entities/users.schema';
import { REPOSITORIES } from '../../../@shared/constants';
import { UsersRepository } from '../infra/repositories/users.repository';
import { CreateUser } from '../application/usecases/create-user';
import { UsersController } from './users.controller';
import { AuthModule } from '../../../modules/auth/presentation/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersSchema]), AuthModule],
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
