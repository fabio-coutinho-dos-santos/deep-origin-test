import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Res,
  Request,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateShortUrlDto } from '../application/dtos/create-short-url-dto';
import { CreateShortUrl } from '../application/usecases/create-short-url.usecase';
import { Url } from '../domain/urls';
import { RedirectUrl } from '../application/usecases/redirect-url.usecase';
import {
  UrlsPresenter,
  UrlsPresenterType,
} from '../application/presenters/presenters';
import { API_PREFIX } from '../../../@shared/constants';
import { GetAllUrls } from '../application/usecases/get-all-urls.usecase';
import { Public } from '../../../modules/auth/application/decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';
import { UpdateShortenedUrlDto } from '../application/dtos/update-shortened-url.dto';
import { UpdateShortenedUrl } from '../application/usecases/update-shortened-url.usecase';
import { DeleteUrl } from '../application/usecases/delete-url-usecase';
@Controller('')
export class UrlsController {
  @Inject(CreateShortUrl)
  private createShortUrl: CreateShortUrl;

  @Inject(RedirectUrl)
  private redirectUrl: RedirectUrl;

  @Inject(GetAllUrls)
  private getAllUrls: GetAllUrls;

  @Inject(UpdateShortenedUrl)
  private updateShortenedUrl: UpdateShortenedUrl;

  @Inject(DeleteUrl)
  private deleteUrl: DeleteUrl;

  @Post(`${API_PREFIX}/urls/shortened/create`)
  async shorten(@Body() input: CreateShortUrlDto): Promise<UrlsPresenterType> {
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
  @Throttle({ default: { limit: 20, ttl: 30000 } })
  async getAll(@Request() req): Promise<UrlsPresenterType[]> {
    const userId: number = req.user.sub;
    const output: Url[] = await this.getAllUrls.execute(userId);
    return UrlsPresenter.presentAll(output);
  }

  @Patch(`${API_PREFIX}/urls/shortened/update/:id`)
  async update(
    @Param('id') id: number,
    @Body() input: UpdateShortenedUrlDto,
  ): Promise<UrlsPresenterType> {
    const output: Url = await this.updateShortenedUrl.execute(input, id);
    return UrlsPresenter.presentOne(output);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`${API_PREFIX}/urls/shortened/delete/:id`)
  async delete(@Param('id') id: number): Promise<void> {
    await this.deleteUrl.execute(id);
  }
}
