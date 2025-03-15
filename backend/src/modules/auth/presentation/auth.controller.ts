import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { Public } from '../application/decorators/public.decorator';
import { LoginDto } from '../application/dto/login.dto';
import { LoginResponse, Signin } from '../application/usecases/signin';
import { API_PREFIX } from 'src/@shared/constants';

@Controller(`${API_PREFIX}/auth`)
export class AuthController {
  @Inject(Signin)
  private readonly signin: Signin;

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() input: LoginDto): Promise<LoginResponse> {
    return await this.signin.execute(input);
  }
}
