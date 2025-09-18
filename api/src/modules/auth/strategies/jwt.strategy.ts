import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtPayload } from '../types';
import { appConfig } from 'src/config';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    const appConf = configService.get<ConfigType<typeof appConfig>>('app');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConf?.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const { tokenType } = payload;

    if (tokenType !== 'access') {
      throw new BadRequestException('Invalid token');
    }

    const user = await this.usersService.findOne(payload.id);

    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    const { passwordHash, ...userData } = user; 

    return userData;
  }
}
