import { Test, TestingModule } from '@nestjs/testing';
import { HabitDayStatusService } from '../habit-day-status.service';

describe('HabitDayStatusService', () => {
    let service: HabitDayStatusService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HabitDayStatusService],
        }).compile();

        service = module.get<HabitDayStatusService>(HabitDayStatusService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
