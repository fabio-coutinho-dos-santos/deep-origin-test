import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortUrlDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;
}
