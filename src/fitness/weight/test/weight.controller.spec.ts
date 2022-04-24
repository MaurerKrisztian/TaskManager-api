import { Test, TestingModule } from '@nestjs/testing';
import { WeightController } from '../weight.controller';
import { WeightService } from '../weight.service';

describe('WeightController', () => {
    let controller: WeightController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WeightController],
            providers: [WeightService],
        }).compile();

        controller = module.get<WeightController>(WeightController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
