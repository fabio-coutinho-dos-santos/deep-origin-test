import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortUrlDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
