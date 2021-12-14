import { Injectable, Logger } from '@nestjs/common';
import { Url } from '../Entities/url.entity';
import { UrlMedia } from '../Entities/url-media.entity';
import { UrlRepository } from '../Repositories/url.repository';
import { UrlMediaRepository } from '../Repositories/url-media.repository';

import { ConfigService } from '@nestjs/config';
import { MediaScraperUtil } from '../Utils/media-scraper.util';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);
  constructor(
    private urlRepository: UrlRepository,
    private urlMediaRepository: UrlMediaRepository,
    private mediaScrapper: MediaScraperUtil,
    private configService: ConfigService,
  ) {}

  async getUrlMedia(
    search: string,
    mediaType: string,
    page: number,
    pageSize: number,
  ) {
    this.logger.debug(
      `Get media search:${search} page:${page} pageSize:${pageSize} mediaType:${mediaType}`,
    );
    return this.urlMediaRepository.search(search, mediaType, page, pageSize);
  }

  async bulkScrapAndCreate(urls: Array<string>): Promise<Array<Url>> {
    this.logger.debug(`Start Scraping urls:${urls.toString()} `);
    const results = [];
    for (const url of urls) {
      results.push(await this.scrapAndCreate(url));
    }
    return results;
  }

  async scrapAndCreate(url: string): Promise<Url> {
    const typesToScrap = this.configService.get<string[]>(
      'common.typesToScrap',
    );
    for (let i = 0; i < typesToScrap.length; i++) {}

    const record = new Url();
    record.url = url;

    await this.urlRepository.save(record);
    for (const type of typesToScrap) {
      const typeSrcs = await this.mediaScrapper.scrapURLByType(url, type);
      for (const src of typeSrcs) {
        if (!src || src === '') {
          continue;
        }
        const urlMedia = new UrlMedia();
        urlMedia.src = src;
        urlMedia.type = type;
        urlMedia.url = record;
        await this.urlMediaRepository.save(urlMedia);
      }
    }
    return record;
  }
}
