import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = this.authService.validateOAuthLogin(
      'google',
      req.user.providerId,
      req.user.email,
    );
    return this.authService.generateTokens(user);
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth() {}

  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthRedirect(@Req() req) {
    const user = this.authService.validateOAuthLogin(
      'kakao',
      req.user.providerId,
      req.user.email,
    );
    return this.authService.generateTokens(user);
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverAuth() {}

  @Get('naver/redirect')
  @UseGuards(AuthGuard('naver'))
  async naverAuthRedirect(@Req() req) {
    const user = this.authService.validateOAuthLogin(
      'naver',
      req.user.providerId,
      req.user.email,
    );
    return this.authService.generateTokens(user);
  }
}
