import { Test, TestingModule } from '@nestjs/testing';
import { WorkedtimeController } from '../workedtime.controller';
import { WorkedtimeService } from '../workedtime.service';

describe('WorkedtimeController', () => {
    let controller: WorkedtimeController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WorkedtimeController],
            providers: [WorkedtimeService],
        }).compile();

        controller = module.get<WorkedtimeController>(WorkedtimeController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
