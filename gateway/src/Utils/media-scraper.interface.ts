export interface MediaScraperInterface {
  scrapURLByType(url: string, type: string): Promise<string[]>;
}
