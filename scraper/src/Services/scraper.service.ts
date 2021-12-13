import { Injectable } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Injectable()
export class ScraperService extends PuppeteerService {
  async scrapSrcByType(url: string, type: string): Promise<string[]> {
    await this.initiateBrowserAndPage();
    await this.goToPage(url);

    const result = await this.page.evaluate((type) => {
      // @ts-ignore
      const tags = document.querySelector(type);
      if (tags) {
        return Array.from(tags).map((tag) => {
          // @ts-ignore
          return tag.getAttribute('src');
        });
      }
      return [];
    }, type);

    await this.closeBrowserAndPage();
    return result;
  }
}
