import { Test, TestingModule } from '@nestjs/testing';
import { FoodMacrosController } from '../food-macros.controller';
import { FoodMacrosService } from '../food-macros.service';

describe('FoodMacrosController', () => {
    let controller: FoodMacrosController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FoodMacrosController],
            providers: [FoodMacrosService],
        }).compile();

        controller = module.get<FoodMacrosController>(FoodMacrosController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
