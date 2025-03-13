import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateShortUrlDto } from '../application/dtos/create-short-url-dto';
import { CreateShortUrl } from '../application/usecases/create-short-url.usecase';

@Controller('urls')
export class UrlsController {
  @Inject(CreateShortUrl)
  private createShortUrl: CreateShortUrl;

  @Post('shorten')
  async shorten(@Body() input: CreateShortUrlDto): Promise<any> {
    return await this.createShortUrl.execute(input);
  }
}
