import { Module } from '@nestjs/common';

import { MediaController } from './Controllers/media.controller';
import { MediaService } from './Services/media.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import DatabaseConfiguration from './Configurations/database.configuration';
import MicroserviceConfiguration, {
  SCRAPER_SERVICE,
} from './Configurations/microservice.configuration';
import CommonConfiguration from './Configurations/common.configuration';

import { Connection } from 'typeorm';
import { ClientsModule, TcpClientOptions } from '@nestjs/microservices';
import { UrlRepository } from './Repositories/url.repository';
import { UrlMediaRepository } from './Repositories/url-media.repository';
import { MediaScraperUtil } from './Utils/media-scraper.util';
import { BasicStrategy } from './Auth/auth-basic.strategy';

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
    TypeOrmModule.forFeature([UrlMediaRepository, UrlRepository]),
    ConfigModule.forRoot({
      cache: true,
      load: [
        DatabaseConfiguration,
        MicroserviceConfiguration,
        CommonConfiguration,
      ],
    }),
    ClientsModule.registerAsync([
      {
        name: SCRAPER_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) =>
          ({
            transport: await configService.get(
              'microservices_patterns.scraper_service_transport',
            ),
            options: {
              port: await configService.get(
                'microservices_patterns.scraper_service_port',
              ),
              host: await configService.get(
                'microservices_patterns.scraper_service_host',
              ),
            },
          } as TcpClientOptions),
      },
    ]),
  ],
  controllers: [MediaController],
  providers: [MediaService, MediaScraperUtil, BasicStrategy],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
