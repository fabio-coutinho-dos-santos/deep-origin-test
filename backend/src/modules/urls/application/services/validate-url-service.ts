import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ValidateUrlService {
  async isUrlValid(url: string): Promise<boolean> {
    return (await this.isReachable(url)) && this.isValidFormat(url);
  }

  private async isValidFormat(url: string): Promise<boolean> {
    const regex = new RegExp(
      '^(https?|ftp)://[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*(:[0-9]+)?(/.*)?$',
    );
    return regex.test(url);
  }

  private async isReachable(url: string): Promise<boolean> {
    try {
      const response = await axios.get(url, { timeout: 5000 });
      return (
        response.status >= HttpStatus.OK &&
        response.status < HttpStatus.BAD_REQUEST
      );
    } catch (error) {
      return false;
    }
  }
}
