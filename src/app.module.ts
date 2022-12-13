import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JoiConfig } from './config/joi.config';
import { PostsModule } from './posts/posts.module';
import { CommonModule } from './common/common.module';
import config from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: JoiConfig,
      isGlobal: true,
    }),
    PostsModule,
    CommonModule,
  ],
})
export class AppModule {}
