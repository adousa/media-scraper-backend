import { Injectable } from '@nestjs/common';

@Injectable()
export class ScraperMockService {
  async scrapSrcByType(url: string, type: string): Promise<string[]> {
    return [
      'blob:https://www.youtube.com/8014cc26-05a5-4247-84cf-d25894e5a592',
    ];
  }
}
