import { registerAs } from '@nestjs/config';

export const SCRAPER_SERVICE = 'SCRAPPER_SERVICE';

export const SCRAPER_SERVICE_SCRAP_URL = 'SCRAPER_SERVICE_SCRAP_URL';

export const SCRAPER_SERVICE_SCRAP_URL_BY_TYPE =
  'SCRAPER_SERVICE_SCRAP_URL_BY_TYPE';

export default registerAs('microservices_patterns', () => ({
  SCRAPER_SERVICE,
  SCRAPER_SERVICE_SCRAP_URL,
  SCRAPER_SERVICE_SCRAP_URL_BY_TYPE,
}));
