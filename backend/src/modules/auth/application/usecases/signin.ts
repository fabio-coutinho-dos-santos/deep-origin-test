import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { REPOSITORIES } from 'src/@shared/constants';
import { JwtService } from '@nestjs/jwt';
import { IUsersRepository } from 'src/modules/users/application/repositories/users.repositories.interface';
import * as bcrypt from 'bcryptjs';
import { UsersPresenter } from 'src/modules/users/application/presenter/users.presenter';
import { User } from 'src/modules/users/domain/users';

@Injectable()
export class Signin {
  @Inject(REPOSITORIES.USERS)
  private readonly affiliatesRepository: IUsersRepository;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async execute(input: LoginDto): Promise<LoginResponse> {
    const { email, password } = input;
    const user = await this.affiliatesRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };

    const accessToken = await this.jwtService.signAsync(payload);

    const expiresIn = process.env.JWT_EXPIRES_IN || '3600';

    const output: LoginResponse = {
      accessToken,
      expiresIn: parseInt(expiresIn, 10),
      user: UsersPresenter.presentOne(user),
    };

    return output;
  }
}

export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
  user: UsersPresenter;
};
