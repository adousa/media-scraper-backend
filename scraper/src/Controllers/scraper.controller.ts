import { Controller } from '@nestjs/common';
import { ScraperService } from '../Services/scraper.service';
import { SCRAPER_SERVICE_SCRAP_URL } from '../Configurations/microservice.configuration';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @MessagePattern(SCRAPER_SERVICE_SCRAP_URL)
  async scrapUrl(payload: { url: string; type: string }): Promise<string[]> {
    return this.scraperService.scrapSrcByType(payload.url, payload.type);
  }
}
