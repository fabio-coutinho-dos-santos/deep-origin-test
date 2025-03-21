import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../application/guards/jwt-auth/jwt-auth.guard';
import { AuthController } from './auth.controller';
import { REPOSITORIES } from '../../../@shared/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signin } from '../application/usecases/signin';
import { UsersRepository } from '../../../modules/users/infra/repositories/users.repository';
import { UsersSchema } from '../../../modules/users/infra/entities/users.schema';
import { ValidateToken } from '../application/usecases/validate-token';

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
    ValidateToken,
  ],
  exports: [Signin],
})
export class AuthModule {}
