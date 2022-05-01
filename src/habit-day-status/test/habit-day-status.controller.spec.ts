import { Test, TestingModule } from '@nestjs/testing';
import { HabitDayStatusController } from '../habit-day-status.controller';
import { HabitDayStatusService } from '../habit-day-status.service';

describe('HabitDayStatusController', () => {
    let controller: HabitDayStatusController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HabitDayStatusController],
            providers: [HabitDayStatusService],
        }).compile();

        controller = module.get<HabitDayStatusController>(HabitDayStatusController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
