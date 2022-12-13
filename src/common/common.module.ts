import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TwitterPostPublisher } from './providers/twitter-post-publisher';
import { TwitterClientWrapper } from './providers/twitter-client-wrapper';
@Module({
  imports: [HttpModule],
  providers: [TwitterClientWrapper, TwitterPostPublisher],
  exports: [TwitterPostPublisher],
})
export class CommonModule {}
