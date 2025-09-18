import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import { JwtPayload as JwtPayload } from './types';
import { ConfigService, ConfigType } from '@nestjs/config';
import { appConfig } from 'src/config';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  private addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setTime(expiresIn.getTime() + 7 * 24 * 60 * 60 * 1000);

    res.cookie('refresh-token', refreshToken, {
      domain: (this.configService.get('app') as ConfigType<typeof appConfig>)
        .domain,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      expires: expiresIn,
    });
  }

  private removeRefreshTokenFromResponse(res: Response) {
    res.cookie('refresh-token', {
      domain: (this.configService.get('app') as ConfigType<typeof appConfig>)
        .domain,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      expires: new Date(0),
    });
  }

  private async issueTokens(payload: Omit<JwtPayload, 'tokenType'>) {
    const accessToken = this.jwtService.sign(
      { ...payload, tokenType: 'access' },
      { expiresIn: '15m' },
    );
    const refreshToken = this.jwtService.sign(
      { ...payload, tokenType: 'refresh' },
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }
  
  public async login(dto: LoginDto, res: Response) {
    const user = await this.usersService.findOneByEmail(dto.email);

    if (!user) {
      throw new BadRequestException("user_not_exists");
    } 

    const isMatch: boolean = bcrypt.compareSync(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new BadRequestException('password_mismatch');
    }

    const { accessToken, refreshToken } = await this.issueTokens({ id: user.id });

    this.addRefreshTokenToResponse(res, refreshToken);

    return { accessToken };
  }

 public async register(dto: RegisterDto, res: Response) {
    const exists = await this.usersService.findOneByEmail(dto.email);

    if (exists) {
      throw new BadRequestException("user_exists");
    }

    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create(dto, password);

    const { accessToken, refreshToken } = await this.issueTokens({ id: user.id });

    this.addRefreshTokenToResponse(res, refreshToken);

    return { accessToken };
  }
}
