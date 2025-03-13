import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CreateShortUrlDto } from '../application/dtos/create-short-url-dto';
import { CreateShortUrl } from '../application/usecases/create-short-url.usecase';
import { Url } from '../domain/urls';
import { RedirectUrl } from '../application/usecases/redirect-url.usecase';
@Controller('urls')
export class UrlsController {
  @Inject(CreateShortUrl)
  private createShortUrl: CreateShortUrl;

  @Inject(RedirectUrl)
  private redirectUrl: RedirectUrl;

  @Post('shorten/create')
  async shorten(@Body() input: CreateShortUrlDto): Promise<Url> {
    return await this.createShortUrl.execute(input);
  }

  @Get(':shortened/redirect')
  async redirect(
    @Param('shortened') shortened: string,
    @Res() res,
  ): Promise<void> {
    try {
      const originalUrl = await this.redirectUrl.execute(shortened);
      res.redirect(originalUrl);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.sendFile('/app/assets/not-found-page.html');
      } else {
        throw e;
      }
    }
  }
}
