import { Controller, Get } from '@nestjs/common';
import { MediaService } from '../Services/media.service';

@Controller()
export class MediaController {
    constructor(private readonly appService: MediaService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
