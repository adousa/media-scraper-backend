import { Injectable, Logger } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Injectable()
export class ScraperService extends PuppeteerService {
  private readonly logger = new Logger(PuppeteerService.name);
  async scrapSrcByType(url: string, type: string): Promise<string[]> {
    this.logger.debug(`Start Scraping ${url} for type:${type}`);
    let result;
    try {
      await this.initiateBrowserAndPage();
      await this.goToPage(url);

      result = await this.page.evaluate((type) => {
        // @ts-ignore
        const tags = document.querySelectorAll(type);
        if (tags) {
          // @ts-ignore
          return Array.from(tags).map((tag) => {
            // @ts-ignore
            return tag.getAttribute('src');
          });
        }
        return [];
      }, type);

      await this.closeBrowserAndPage();
    } catch (e) {
      this.logger.error(`error while scraping ${url} for type ${url}`);
      throw e;
    }
    return result;
  }
}
