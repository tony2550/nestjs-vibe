import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import NaverStrategyBase from 'passport-naver';

@Injectable()
export class NaverStrategy extends PassportStrategy(NaverStrategyBase, 'naver') {
  constructor() {
    super({
      clientID: 'NAVER_CLIENT_ID',
      clientSecret: 'NAVER_CLIENT_SECRET',
      callbackURL: '/auth/naver/redirect',
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      provider: 'naver',
      providerId: profile.id,
      email: profile.emails?.[0]?.value,
    };
  }
}
