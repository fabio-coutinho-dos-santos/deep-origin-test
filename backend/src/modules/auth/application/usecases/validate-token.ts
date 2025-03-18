import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ValidateToken {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async execute(authHeader: string): Promise<TokenValid> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;

    try {
      const decoded = this.jwtService.verify(token, {
        secret: secretKey,
      });

      return { valid: true, user: decoded };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

export type TokenValid = {
  valid: boolean;
  user: {
    sub: number;
    iat: number;
    exp: number;
  };
};
