import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ValidateUrlService {
  async isUrlValid(url: string): Promise<boolean> {
    return this.isValidFormat(url);
  }

  private async isValidFormat(url: string): Promise<boolean> {
    const regex = new RegExp(
      '^(https?|ftp)://[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*(:[0-9]+)?(/.*)?$',
    );
    const valid = regex.test(url);

    if (!valid) {
      Logger.error(`Invalid url format - ${url}`, ValidateUrlService.name);
    }

    return valid;
  }
}
