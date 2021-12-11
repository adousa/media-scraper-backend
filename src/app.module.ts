import { Module } from '@nestjs/common';

import { MediaController } from './Controllers/media.controller';
import { MediaService } from './Services/media.service';

@Module({
  imports: [],
  controllers: [MediaController],
  providers: [MediaService],
})
export class AppModule {}
