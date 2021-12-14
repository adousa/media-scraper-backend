import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { MediaService } from '../Services/media.service';
import { CreateMediaDto, GetMediaDto } from './dto';
import { Url } from '../Entities/url.entity';
import { PaginateResponse } from '../Repositories/common.repository';
import { LocalAuthGuard } from '../Auth/basic-auth.guard';

@Controller('url-media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('scrap')
  @UseGuards(LocalAuthGuard)
  async scrapMedia(@Body() payload: CreateMediaDto): Promise<Array<Url>> {
    return this.mediaService.bulkScrapAndCreate(payload.urls);
  }

  @Get()
  @UseGuards(LocalAuthGuard)
  async list(@Query() queryObject: GetMediaDto): Promise<PaginateResponse> {
    return this.mediaService.getUrlMedia(
      queryObject.search,
      queryObject.mediaType,
      queryObject.page ? parseInt(queryObject.page) : undefined,
      queryObject.pageSize ? parseInt(queryObject.pageSize) : undefined,
    );
  }
}
