import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import { JwtPayload as JwtPayload } from './types';
import { ConfigService, ConfigType } from '@nestjs/config';
import { appConfig } from 'src/config';
import { LoginDto } from './dto';
import { User } from '../users/entities/user.entity';

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

  public async validateUser(email: string, pass: string): Promise<Omit<User, "passwordHash">|null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.passwordHash === pass) {
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }

  public async login(dto: LoginDto, res: Response) {
    const user = await this.validateUser(dto.email, dto.password);

    if (!user) {
      throw new NotFoundException();
    }

    const { accessToken, refreshToken } = await this.issueTokens({ id: user.id });

    this.addRefreshTokenToResponse(res, refreshToken);

    return { accessToken };
  }

  // async register(user: RegisterRequestDto): Promise<AccessToken> {
  //   const existingUser = await this.usersService.findOneByEmail(user.email);
  //   if (existingUser) {
  //     throw new BadRequestException('email already exists');
  //   }
  //   const hashedPassword = await bcrypt.hash(user.password, 10);
  //   const newUser: User = { ...user, password: hashedPassword };
  //   await this.usersService.create(newUser);
  //   return this.login(newUser);
  // }
}
