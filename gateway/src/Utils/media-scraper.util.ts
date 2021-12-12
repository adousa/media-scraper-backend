import { Inject } from '@nestjs/common';
import {
  SCRAPER_SERVICE,
  SCRAPER_SERVICE_SCRAP_URL,
} from '../Configurations/microservice.configuration';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MediaScraperInterface } from './media-scraper.interface';

export class MediaScraperUtil implements MediaScraperInterface {
  constructor(
    @Inject(SCRAPER_SERVICE) private readonly scraperServiceClient: ClientProxy,
  ) {}

  async scrapURLByType(url: string, type: string): Promise<string[]> {
    return await firstValueFrom(
      this.scraperServiceClient.send(SCRAPER_SERVICE_SCRAP_URL, {
        url,
        type,
      }),
    );
  }

  scrap;
}
