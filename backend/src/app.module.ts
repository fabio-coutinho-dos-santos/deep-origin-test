import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './@infra/database/typeorm/database.module';
import { UrlsModule } from './modules/urls/presentations/urls.module';
import { UsersModule } from './modules/users/presentation/users.module';
import { AuthModule } from './modules/auth/presentation/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL') ?? 60000,
          limit: config.get('THROTTLE_LIMIT') ?? 10,
        },
      ],
    }),
    DatabaseModule,
    UrlsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
