import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './@infra/database/typeorm/database.module';
import { UrlsModule } from './modules/urls/presentations/urls.module';
import { UsersModule } from './modules/users/presentation/users.module';
import { AuthModule } from './modules/auth/presentation/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UrlsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
