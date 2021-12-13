import { Module } from '@nestjs/common';
import { ScraperController } from './Controllers/scraper.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import MicroserviceConfiguration from './Configurations/microservice.configuration';
import ScraperConfiguration from './Configurations/scraper.configuration';

import { ScraperService } from './Services/scraper.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [MicroserviceConfiguration, ScraperConfiguration],
    }),
  ],
  controllers: [ScraperController],
  providers: [ScraperService, ConfigService],
})
export class AppModule {}
