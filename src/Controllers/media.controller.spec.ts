import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { MediaService } from '../Services/media.service';

describe('Media Controller', () => {
  let mediaController: MediaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaService],
    }).compile();

    mediaController = app.get<MediaController>(MediaController);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(appController.getHello()).toBe('Hello World!');
    // });
  });
});
