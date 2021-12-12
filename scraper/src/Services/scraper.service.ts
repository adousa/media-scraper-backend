import { Injectable } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Injectable()
export class ScraperService extends PuppeteerService {
  async scrapSrcByType(url: string, type: string): Promise<string[]> {
    await this.initiateBrowserAndPage();
    await this.goToPage(url);

    return await this.page.evaluate(() => {
      // @ts-ignore
      return Array.from(document.querySelector(type)).map((tag) => {
        // @ts-ignore
        return tag.getAttribute('src');
      });
    });
  }
}
