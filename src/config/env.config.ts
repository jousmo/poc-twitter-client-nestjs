import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('config', () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: +process.env.PORT,
  twitter: {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    bearerToken: process.env.BEARER_TOKEN,
    appId: process.env.APP_ID,
  },
}));
