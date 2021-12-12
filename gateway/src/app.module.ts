import { Module } from '@nestjs/common';

import { MediaController } from './Controllers/media.controller';
import { MediaService } from './Services/media.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import DatabaseConfiguration from './Configurations/database.configuration';
import MicroserviceConfiguration from './Configurations/microservice.configuration';
import CommonConfiguration from './Configurations/common.configuration';

import { Connection } from 'typeorm';
import { UrlRepository } from './Repositories/url.repository';
import { UrlMediaRepository } from './Repositories/url-media.repository';
import { MediaScraperUtil } from './Utils/media-scraper.util';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return Object.assign(configService.get('database'), {
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        });
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      cache: true,
      load: [
        DatabaseConfiguration,
        MicroserviceConfiguration,
        CommonConfiguration,
      ],
    }),
  ],
  controllers: [MediaController],
  providers: [
    MediaService,
    UrlMediaRepository,
    UrlRepository,
    MediaScraperUtil,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
