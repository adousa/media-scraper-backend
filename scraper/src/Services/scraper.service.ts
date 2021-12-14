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

      result = this.scrapSrcsByTag(type);

      this.logger.debug(
        `Finish Scraping ${url} for type:${type} count of srcs ${
          (result || []).length
        }`,
      );
    } catch (e) {
      this.logger.error(`error while scraping ${url} for type ${url}`);
      throw e;
    }
    return result;
  }

  async scrapUrl(url: string, types: string[]) {
    this.logger.debug(`Start Scraping ${url}`);
    let result = {};
    try {
      await this.initiateBrowserAndPage();
      await this.goToPage(url);

      for (const type of types) {
        result[type] = await this.scrapSrcsByTag(type);
      }

      Object.assign(result, { pageTitle: await this.scrapPageTitle() });

      this.logger.debug(`Finish Scraping ${url} result: ${result.toString()}`);
    } catch (e) {
      this.logger.error(`error while scraping ${url} for type ${url}`);
      throw e;
    }
    return result;
  }
}
