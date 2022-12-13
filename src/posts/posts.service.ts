import { TwitterApi } from 'twitter-api-v2';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CreatePostDto } from './dto/create-post.dto';
import config from '../config/env.config';

@Injectable()
export class PostsService {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  getTwitterClient() {
    const { twitter } = this.configService;
    return new TwitterApi({
      appKey: twitter.apiKey,
      appSecret: twitter.apiSecret,
      accessToken: twitter.accessToken,
      accessSecret: twitter.accessTokenSecret,
    });
  }

  getBearer() {
    const { twitter } = this.configService;
    return new TwitterApi(twitter.bearerToken);
  }

  async create(createPostDto: CreatePostDto) {
    try {
      const { message } = createPostDto;
      const twitterClient = this.getTwitterClient();
      await twitterClient.v2.tweet(message);
    } catch (error) {
      console.error('Error', error);
      new InternalServerErrorException(error);
    }
  }
}
