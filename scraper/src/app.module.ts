import { Module } from '@nestjs/common';
import { ScraperController } from './Controllers/scraper.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import MicroserviceConfiguration from './Configurations/microservice.configuration';
import ScraperConfiguration from './Configurations/scraper.configuration';

import { ScraperService } from './Services/scraper.service';
import { ScraperLogger } from './Utils/scraper.logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [MicroserviceConfiguration, ScraperConfiguration],
    }),
  ],
  controllers: [ScraperController],
  providers: [ScraperService, ConfigService, ScraperLogger],
})
export class AppModule {}
