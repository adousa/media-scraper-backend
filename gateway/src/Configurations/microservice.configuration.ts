import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export const SCRAPER_SERVICE = 'SCRAPPER_SERVICE';

export const SCRAPER_SERVICE_SCRAP_URL = 'SCRAPER_SERVICE_SCRAP_URL';

export const SCRAPER_SERVICE_SCRAP_URL_BY_TYPE =
  'SCRAPER_SERVICE_SCRAP_URL_BY_TYPE';

export default registerAs('microservices_patterns', () => ({
  SCRAPER_SERVICE,
  SCRAPER_SERVICE_SCRAP_URL,
  scraper_service_host: process.env.SCRAPER_SERVICE_HOST || '0.0.0.0',
  scraper_service_port: process.env.SCRAPER_SERVICE_PORT || 3001,
  SCRAPER_SERVICE_SCRAP_URL_BY_TYPE,
  scraper_service_transport: Transport.TCP,
}));
