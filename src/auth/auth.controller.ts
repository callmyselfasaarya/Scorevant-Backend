import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SocialAuthService } from './social-auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly socialAuthService: SocialAuthService,
  ) {}

  @Post('register')
  register(
    @Body() body: { email: string; password: string; fullName?: string },
  ) {
    return this.authService.register(body.email, body.password, body.fullName || '');
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('google')
  async googleLogin(@Body() body: { idToken: string }) {
    const profile = await this.socialAuthService.verifyGoogleToken(
      body.idToken,
    );
    return this.authService.validateSocialLogin(
      'google',
      profile.email,
      profile.providerId,
      profile.fullName,
    );
  }

  @Post('facebook')
  async facebookLogin(@Body() body: { accessToken: string }) {
    const profile = await this.socialAuthService.verifyFacebookToken(
      body.accessToken,
    );
    return this.authService.validateSocialLogin(
      'facebook',
      profile.email,
      profile.providerId,
      profile.fullName,
    );
  }



  @Post('refresh')
  refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refreshTokens(body.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: { user: { userId: string } }) {
    await this.authService.logout(req.user.userId);
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: { user: { userId: string } }) {
    return this.authService.getProfile(req.user.userId);
  }
}
