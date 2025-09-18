import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AccessTokenPayload } from '../types';
import { appConfig } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const appConf = configService.get<ConfigType<typeof appConfig>>('app');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConf?.jwt_secret
    });
  }

  async validate(payload: AccessTokenPayload) {
    return payload;
  }
}