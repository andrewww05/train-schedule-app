import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  public async login(
    @Body() body: LoginDto,
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(body, res);
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  public async register(
    @Body() body: RegisterDto,
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(body, res);
  }

  @Get('refresh')
  public async refresh(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res);
  }
}
