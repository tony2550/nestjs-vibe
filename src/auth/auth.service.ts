import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.interface';

@Injectable()
export class AuthService {
  private users: User[] = [];
  private nextId = 1;

  constructor(private readonly jwtService: JwtService) {}

  validateOAuthLogin(
    provider: 'google' | 'kakao' | 'naver',
    providerId: string,
    email?: string,
  ): User {
    let user = this.users.find(
      (u) => u.provider === provider && u.providerId === providerId,
    );
    if (!user) {
      user = { id: this.nextId++, provider, providerId, email };
      this.users.push(user);
    }
    return user;
  }

  generateTokens(user: User) {
    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
}
