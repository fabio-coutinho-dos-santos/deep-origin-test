import { IsNotEmpty, IsString, IsUrl, Min, MinLength } from 'class-validator';

export class UpdateShortenedUrlDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Shortened URL must have at least 5 characters',
  })
  shortened: string;
}
