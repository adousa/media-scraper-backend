import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { MediaScraperUtil } from '../Utils/media-scraper.util';
import { MediaScraperUtilMockService } from './mocks/MediaScraperUtilMock.service';

describe('Media Controller', () => {
  let app;
  beforeAll(async () => {
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
    it('POST /url-media/scrap', (done) => {
      request(app.getHttpServer())
        .post('/url-media/scrap')
        .auth('admin', 'admin')
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

    it('GET /url-media/', (done) => {
      request(app.getHttpServer())
        .get('/url-media?search=8014cc26')
        .auth('admin', 'admin')
        .send()
        .expect(200)
        .expect((res) => {
          expect(res.body.data[0]).toHaveProperty(
            'src',
            'blob:https://www.youtube.com/8014cc26-05a5-4247-84cf-d25894e5a592',
          );
        })
        .end(done);
    });
  });
});
