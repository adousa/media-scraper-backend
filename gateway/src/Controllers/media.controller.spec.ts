import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { MediaScraperUtil } from '../Utils/media-scraper.util';
import { MediaScraperUtilMockService } from './mocks/MediaScraperUtilMock.service';

describe('Media Controller', () => {
  let app;
  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MediaScraperUtil)
      .useClass(MediaScraperUtilMockService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.init();
  });

  describe('Testing images and videos Scraping from a URL', () => {
    it('POST /media/', (done) => {
      request(app.getHttpServer())
        .post('/media/')
        .send({
          urls: [
            'https://www.youtube.com/watch?v=99lASEXiLHY&list=RD99lASEXiLHY&start_radio=1',
          ],
        })
        .expect(201)
        .expect((res) => {
          expect(res.body[0]).toHaveProperty(
            'url',
            'https://www.youtube.com/watch?v=99lASEXiLHY&list=RD99lASEXiLHY&start_radio=1',
          );
        })
        .end(done);
    });
  });
});
