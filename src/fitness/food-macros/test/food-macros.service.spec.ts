import { Test, TestingModule } from '@nestjs/testing';
import { FoodMacrosService } from '../food-macros.service';

describe('FoodMacrosService', () => {
    let service: FoodMacrosService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FoodMacrosService],
        }).compile();

        service = module.get<FoodMacrosService>(FoodMacrosService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
