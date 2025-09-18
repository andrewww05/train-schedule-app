import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  jwt_secret: process.env.APP_JWT_SECRET
}))