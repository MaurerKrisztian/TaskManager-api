import { Test, TestingModule } from '@nestjs/testing';
import { VideocallController } from './videocall.controller';
import { VideocallService } from './videocall.service';

describe('VideocallController', () => {
  let controller: VideocallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideocallController],
      providers: [VideocallService],
    }).compile();

    controller = module.get<VideocallController>(VideocallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
