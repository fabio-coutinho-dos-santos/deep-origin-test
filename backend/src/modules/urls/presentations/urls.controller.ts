import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateShortUrlDto } from '../application/dtos/create-short-url-dto';
import { CreateShortUrl } from '../application/usecases/create-short-url.usecase';
import { Url } from '../domain/urls';
import { RedirectUrl } from '../application/usecases/redirect-url.usecase';
import {
  UrlsPresenter,
  UrlsPresenterType,
} from '../application/presenters/presenters';
import { API_PREFIX } from 'src/@shared/constants';
import { GetAllUrls } from '../application/usecases/get-all-urls.usecase';
import { JwtAuthGuard } from 'src/modules/auth/application/guards/jwt-auth/jwt-auth.guard';
import { Public } from 'src/modules/auth/application/decorators/public.decorator';
@Controller('')
export class UrlsController {
  @Inject(CreateShortUrl)
  private createShortUrl: CreateShortUrl;

  @Inject(RedirectUrl)
  private redirectUrl: RedirectUrl;

  @Inject(GetAllUrls)
  private getAllUrls: GetAllUrls;

  @Post(`${API_PREFIX}/urls/shorten/create`)
  async shorten(@Body() input: CreateShortUrlDto): Promise<UrlsPresenterType> {
    console.log('input', input);
    const output: Url = await this.createShortUrl.execute(input);
    return UrlsPresenter.presentOne(output);
  }

  @Get(':shortened')
  @Public()
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

  @Get(`${API_PREFIX}/urls/all`)
  async getAll(@Request() req): Promise<UrlsPresenterType[]> {
    const userId: number = req.user.sub;
    const output: Url[] = await this.getAllUrls.execute(userId);
    return UrlsPresenter.presentAll(output);
  }
}
