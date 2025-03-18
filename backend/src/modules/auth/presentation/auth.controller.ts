import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from '../application/decorators/public.decorator';
import { LoginDto } from '../application/dto/login.dto';
import { LoginResponse, Signin } from '../application/usecases/signin';
import { API_PREFIX } from '../../../@shared/constants';
import {
  TokenValid,
  ValidateToken,
} from '../application/usecases/validate-token';
import { Throttle } from '@nestjs/throttler';

@Controller(`${API_PREFIX}/auth`)
export class AuthController {
  @Inject(Signin)
  private readonly signin: Signin;

  @Inject(ValidateToken)
  private readonly validateToken: ValidateToken;

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() input: LoginDto): Promise<LoginResponse> {
    return await this.signin.execute(input);
  }

  @Get('validate-token')
  @Throttle({ default: { limit: 60, ttl: 30000 } })
  async validateAuthToken(@Request() req): Promise<TokenValid> {
    const authHeader = req.headers.authorization;
    return await this.validateToken.execute(authHeader);
  }
}
