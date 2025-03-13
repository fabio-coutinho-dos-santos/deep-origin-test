import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './@infra/database/typeorm/database.module';
import { UrlsModule } from './modules/urls/presentations/urls.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UrlsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
