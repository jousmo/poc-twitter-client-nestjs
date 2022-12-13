import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { TwitterPostPublisher } from '../common/providers/twitter-post-publisher';

@Injectable()
export class PostsService {
  constructor(private readonly twitterPostPublisher: TwitterPostPublisher) {}

  async create(createPostDto: CreatePostDto) {
    await this.twitterPostPublisher.publish(createPostDto);
  }
}
