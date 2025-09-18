import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  domain: process.env.APP_DOMAIN,
  jwtSecret: process.env.APP_JWT_SECRET
}))