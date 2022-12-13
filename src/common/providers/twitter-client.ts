import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';
import config from '../../config/env.config';

@Injectable()
export class TwitterClientFactory {
  private readonly twitterClient: TwitterApi;
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {
    const { twitter } = configService;
    this.twitterClient = new TwitterApi({
      appKey: twitter.apiKey,
      appSecret: twitter.apiSecret,
      accessToken: twitter.accessToken,
      accessSecret: twitter.accessTokenSecret,
    });
  }

  getTwitterClient() {
    return this.twitterClient;
  }
}
