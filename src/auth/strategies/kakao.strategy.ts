import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import KakaoStrategyBase from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(KakaoStrategyBase, 'kakao') {
  constructor() {
    super({
      clientID: 'KAKAO_CLIENT_ID',
      clientSecret: 'KAKAO_CLIENT_SECRET',
      callbackURL: '/auth/kakao/redirect',
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      provider: 'kakao',
      providerId: profile.id,
      email: profile._json && profile._json.kakao_account?.email,
    };
  }
}
