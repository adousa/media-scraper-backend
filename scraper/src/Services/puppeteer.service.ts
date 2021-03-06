import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PuppeteerService {
  constructor(private configService: ConfigService) {}
  browser: Browser;
  page: Page;

  async initiateBrowserAndPage(): Promise<void> {
    // set browser and page only once to avoid loading each time
    if (!this.browser || !this.browser.isConnected()) {
      this.browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }
    if (!this.page || this.page.isClosed()) {
      this.page = await this.browser.newPage();
    }
  }

  async closeBrowserAndPage(): Promise<void> {
    await this.page.close();
    await this.browser.close();
  }

  async goToPage(url: string): Promise<void> {
    await this.page.goto(url);

    // TODO check other possible ways to wait for the page to load
    await this.page.waitForTimeout(
      this.configService.get<number>('scraper.timeout'),
    );
  }

  async scrapSrcsByTag(type: string) {
    return await this.page.evaluate((type) => {
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
  }

  async scrapPageTitle() {
    return await this.page.evaluate(() => {
      // @ts-ignore
      const titleTag = document.querySelector('title');
      // @ts-ignore
      return titleTag.textContent;
    });
  }
}
