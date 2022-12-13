import { Controller, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostMediaDto } from './dto/create-post-media.dto';

@Controller('publisher')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Post('wrapper/media')
  createMedia(@Body() createPostMediaDto: CreatePostMediaDto) {
    return this.postService.createMedia(createPostMediaDto);
  }
}
