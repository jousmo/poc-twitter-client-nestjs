import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import config from '../../config/env.config';
import { CreatePostDto } from '../../posts/dto/create-post.dto';
import { TwitterClientFactory } from './twitter-client';
import { EUploadMimeType } from 'twitter-api-v2';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TwitterPostPublisher {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly twitterClientFactory: TwitterClientFactory,
    private readonly httpService: HttpService,
  ) {}

  async publish(createPostDto: CreatePostDto) {
    const { message, image } = createPostDto;
    const { v1: twitterClientV1, v2: twitterClientV2 } =
      this.twitterClientFactory.getTwitterClient();

    const { data: bufferImage } = await firstValueFrom(
      this.httpService.get(image, {
        responseType: 'arraybuffer',
      }),
    );

    const mediaId = await twitterClientV1.uploadMedia(bufferImage, {
      mimeType: EUploadMimeType.Png,
    });
    await twitterClientV2.tweet(message, { media: { media_ids: [mediaId] } });
  }
}
