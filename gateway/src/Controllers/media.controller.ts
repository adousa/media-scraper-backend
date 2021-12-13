import { Body, Controller, Get, Post } from '@nestjs/common';
import { MediaService } from '../Services/media.service';
import { CreateMediaDto } from './dto';
import { Url } from '../Entities/url.entity';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  async scrapMedia(@Body() payload: CreateMediaDto): Promise<Array<Url>> {
    return this.mediaService.bulkScrapAndCreate(payload.urls);
  }
}
