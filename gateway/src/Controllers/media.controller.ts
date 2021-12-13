import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MediaService } from '../Services/media.service';
import { CreateMediaDto, GetMediaDto } from './dto';
import { Url } from '../Entities/url.entity';
import { PaginateResponse } from '../Repositories/common.repository';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  async scrapMedia(@Body() payload: CreateMediaDto): Promise<Array<Url>> {
    return this.mediaService.bulkScrapAndCreate(payload.urls);
  }

  @Get()
  async getUrlMedia(
    @Query() queryObject: GetMediaDto,
  ): Promise<PaginateResponse> {
    return this.mediaService.getUrlMedia(
      queryObject.search,
      queryObject.page ? parseInt(queryObject.page) : undefined,
      queryObject.pageSize ? parseInt(queryObject.pageSize) : undefined,
    );
  }
}
