import { Test, TestingModule } from '@nestjs/testing';
import { WeightService } from '../weight.service';

describe('WeightService', () => {
    let service: WeightService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WeightService],
        }).compile();

        service = module.get<WeightService>(WeightService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
