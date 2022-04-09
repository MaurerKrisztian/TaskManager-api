import { Test, TestingModule } from '@nestjs/testing';
import { TaskboardService } from '../taskboard.service';

describe('TaskboardService', () => {
    let service: TaskboardService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TaskboardService],
        }).compile();

        service = module.get<TaskboardService>(TaskboardService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
