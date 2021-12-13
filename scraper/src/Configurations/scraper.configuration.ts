import { registerAs } from '@nestjs/config';

export default registerAs('scraper', () => ({
  timeout: process.env.SCRAPER_PAGE_LOAD_TIMEOUT || 1000,
}));
