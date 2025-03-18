import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { CreateUser } from '../application/usecases/create-user';
import { API_PREFIX } from '../../../@shared/constants';
import { Public } from '../../../modules/auth/application/decorators/public.decorator';
import {
  LoginResponse,
  Signin,
} from '../../../modules/auth/application/usecases/signin';

@Controller(`${API_PREFIX}/users`)
export class UsersController {
  @Inject(CreateUser)
  private createUser: CreateUser;

  @Inject(Signin)
  private signin: Signin;

  @Public()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<LoginResponse> {
    try {
      const user = await this.createUser.execute(createUserDto);
      const output = await this.signin.execute({
        email: user.email,
        password: createUserDto.password,
      });
      return output;
    } catch (error) {
      Logger.error(
        `Error on trying register new user: ${createUserDto}: ${error}`,
        UsersController.name,
      );
      throw error;
    }
  }
}
