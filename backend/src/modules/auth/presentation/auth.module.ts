import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../application/guards/jwt-auth/jwt-auth.guard';
import { AuthController } from './auth.controller';
import { REPOSITORIES } from 'src/@shared/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signin } from '../application/usecases/signin';
import { UsersRepository } from 'src/modules/users/infra/repositories/users.repository';
import { UsersSchema } from 'src/modules/users/infra/entities/users.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'jwtSecretKey',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    }),
    TypeOrmModule.forFeature([UsersSchema]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: REPOSITORIES.USERS,
      useClass: UsersRepository,
    },
    Signin,
  ],
})
export class AuthModule {}
