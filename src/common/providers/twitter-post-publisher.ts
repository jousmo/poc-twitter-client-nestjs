import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreatePostMediaDto } from '../../posts/dto/create-post-media.dto';
import { TwitterClientWrapper } from './twitter-client-wrapper';
import { EUploadMimeType } from 'twitter-api-v2';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TwitterPostPublisher {
  constructor(
    private readonly twitterClientWrapper: TwitterClientWrapper,
    private readonly httpService: HttpService,
  ) {}

  private async getMediaBuffers(medias: string[]) {
    const mediaBuffers = [];
    for await (const media of medias) {
      const { data: bufferImage } = await firstValueFrom(
        this.httpService.get(media, {
          responseType: 'arraybuffer',
        }),
      );

      mediaBuffers.push(bufferImage);
    }
    return mediaBuffers;
  }

  private async getMediaIds(mediaBuffers: string[]) {
    const { v1: twitterClientV1 } =
      this.twitterClientWrapper.getTwitterClient();

    const mediaIds = [];

    for await (const mediaBuffer of mediaBuffers) {
      const mediaId = await twitterClientV1.uploadMedia(mediaBuffer, {
        mimeType: EUploadMimeType.Png,
      });

      mediaIds.push(mediaId);
    }

    return mediaIds;
  }

  async publishMediaWrapper(createPostMediaDto: CreatePostMediaDto) {
    const { message, medias } = createPostMediaDto;
    const { v2: twitterClientV2 } =
      this.twitterClientWrapper.getTwitterClient();

    const mediaBuffers = await this.getMediaBuffers(medias);
    const mediaIds = await this.getMediaIds(mediaBuffers);

    await twitterClientV2.tweet(message, { media: { media_ids: mediaIds } });
  }
}
