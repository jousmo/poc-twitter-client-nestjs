import { Module } from '@nestjs/common';
import { TwitterPostPublisher } from './providers/twitter-post-publisher';
import { TwitterClientFactory } from './providers/twitter-client';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  providers: [TwitterClientFactory, TwitterPostPublisher],
  exports: [TwitterPostPublisher],
})
export class CommonModule {}
