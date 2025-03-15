import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { CreateUser } from '../application/usecases/create-user';
import { API_PREFIX } from 'src/@shared/constants';
import { UsersPresenter } from '../application/presenter/users.presenter';

@Controller(`${API_PREFIX}/users`)
export class UsersController {
  @Inject(CreateUser)
  private createUser: CreateUser;

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<UsersPresenter> {
    const user = await this.createUser.execute(createUserDto);
    return UsersPresenter.presentOne(user);
  }
}
