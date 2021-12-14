## Description

[Media Scraper] Created Using NestJs Framework to handle scrape media from 
URLs.

This Service designed in multiple microservices to handle the load and to make help
 in scaling up the scraping service if required.  

## Installation and Running the App

Using docker-compose
```bash
$ docker-compose up
```

installing the service locally is available by navigating to scraper and gateway folder then
 run the following commands 
```bash
$ npm i 
```

## Running the app

Running the service locally is available by navigating to scraper and gateway folder then run
one of the following commands
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

Testing the service locally is available by navigating to scraper or gateway folder then run
the following command
```bash
# unit tests
$ npm run test
```


### TODO
- [ ] Create Migration to run the application in production environment.
- [ ] Improve video scraping