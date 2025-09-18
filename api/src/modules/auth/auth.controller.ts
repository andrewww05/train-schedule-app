import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('test')
  public async test(@Request() req) {
    return "authorized as "+req.user.email;
  }
  
  
  @Post('login')
  public async login(@Request() req) {
    return this.authService.login();
  }

  @Post('register')
  public async register(@Request() req) {
    return this.authService.login();
  }
}
