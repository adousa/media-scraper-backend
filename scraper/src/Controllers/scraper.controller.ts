import { Controller } from '@nestjs/common';
import { ScraperService } from '../Services/scraper.service';
import {
  SCRAPER_SERVICE_SCRAP_URL,
  SCRAPER_SERVICE_SCRAP_URL_BY_TYPE,
} from '../Configurations/microservice.configuration';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @MessagePattern(SCRAPER_SERVICE_SCRAP_URL_BY_TYPE)
  async scrapUrlSrcsByType(payload: {
    url: string;
    type: string;
  }): Promise<string[]> {
    return this.scraperService.scrapSrcByType(payload.url, payload.type);
  }

  @MessagePattern(SCRAPER_SERVICE_SCRAP_URL)
  async scrapUrl(payload: { url: string; types: string[] }): Promise<any> {
    return this.scraperService.scrapUrl(payload.url, payload.types);
  }
}
