import { Test, TestingModule } from '@nestjs/testing';
import { TaskboardController } from '../taskboard.controller';
import { TaskboardService } from '../taskboard.service';

describe('TaskboardController', () => {
  let controller: TaskboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskboardController],
      providers: [TaskboardService],
    }).compile();

    controller = module.get<TaskboardController>(TaskboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
