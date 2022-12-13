import { Injectable } from '@nestjs/common';
import { CreatePostMediaDto } from './dto/create-post-media.dto';
import { TwitterPostPublisher } from '../common/providers/twitter-post-publisher';

@Injectable()
export class PostsService {
  constructor(private readonly twitterPostPublisher: TwitterPostPublisher) {}

  async createMedia(createPostMediaDto: CreatePostMediaDto) {
    await this.twitterPostPublisher.publishMediaWrapper(createPostMediaDto);
  }
}
