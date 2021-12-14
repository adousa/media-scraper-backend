import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  SCRAPER_SERVICE_SCRAP_URL,
  SCRAPER_SERVICE,
} from '../src/Configurations/microservice.configuration';
import { ScraperService } from '../src/Services/scraper.service';
import { ScraperMockService } from './mocks/ScraperMock.service';

describe('', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          { name: SCRAPER_SERVICE, transport: Transport.TCP },
        ]),
      ],
    })
      .overrideProvider(ScraperService)
      .useClass(ScraperMockService)
      .compile();

    app = moduleRef.createNestApplication();

    app.connectMicroservice({
      transport: Transport.TCP,
    });
    await app.startAllMicroservices();
    await app.init();

    client = app.get(SCRAPER_SERVICE);
    await client.connect();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Message scrapURL', (done) => {
    const payload = {
      type: ['img'],
      url: 'https://www.youtube.com/watch?v=99lASEXiLHY&list=RD99lASEXiLHY',
    };
    const response: Observable<any> = client.send(SCRAPER_SERVICE_SCRAP_URL, {
      ...payload,
    });
    response.subscribe((result) => {
      expect(result).toMatchObject({
        img: [
          'blob:https://www.youtube.com/8014cc26-05a5-4247-84cf-d25894e5a592',
        ],
        pageTitle: 'ALica Song',
      });
      done();
    });
  });
});
