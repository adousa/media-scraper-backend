import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('Media Controller', () => {
  let app;
  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.init();
  });

  describe('root', () => {
    it('should return "Hello World!"', (done) => {
      request(app.getHttpServer())
        .post('/media/')
        .send({
          urls: [
            'https://www.youtube.com/watch?v=99lASEXiLHY&list=RD99lASEXiLHY&start_radio=1',
          ],
        })
        .expect(201)
        .end(done);
    });
  });
});
