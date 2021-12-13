import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaScraperUtilMockService {
  async scrapURLByType(url: string, type: string): Promise<string[]> {
    return [
      'blob:https://www.youtube.com/8014cc26-05a5-4247-84cf-d25894e5a592',
      'https://www.gravatar.com/avatar/b644a108ae9ae0ec2f7402dd235d155c?s=64&d=identicon&r=PG&f=1',
      'https://lh4.googleusercontent.com/-b0lD3QgbjZU/AAAAAAAAAAI/AAAAAAAAADU/tjVlCUBzOUI/photo.jpg?sz=64',
      'https://i.stack.imgur.com/SOxOZ.png?s=64&g=1',
      'https://www.gravatar.com/avatar/a007be5a61f6aa8f3e85ae2fc18dd66e?s=64&d=identicon&r=PG',
      'https://i.stack.imgur.com/a6JjK.jpg?s=64&g=1',
      'https://www.gravatar.com/avatar/faa80e9ff4894c8f571a8a2ede55a866?s=64&d=identicon&r=PG&f=1',
    ];
  }
}
