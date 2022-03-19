import { Test, TestingModule } from '@nestjs/testing';
import { WorkedtimeService } from '../workedtime.service';

describe('WorkedtimeService', () => {
  let service: WorkedtimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkedtimeService],
    }).compile();

    service = module.get<WorkedtimeService>(WorkedtimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
