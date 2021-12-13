import { registerAs } from '@nestjs/config';

export const SCRAPER_SERVICE = 'SCRAPPER_SERVICE';

export const SCRAPER_SERVICE_SCRAP_URL = 'SCRAPER_SERVICE_SCRAP_URL';

export default registerAs('microservices_patterns', () => ({
  SCRAPER_SERVICE,
  SCRAPER_SERVICE_SCRAP_URL,
}));
