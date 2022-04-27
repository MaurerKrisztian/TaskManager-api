import { Injectable } from '@nestjs/common';
import { CreateFoodMacroDto } from './dto/create-food-macro.dto';
import { UpdateFoodMacroDto } from './dto/update-food-macro.dto';

@Injectable()
export class FoodMacrosService {
  create(createFoodMacroDto: CreateFoodMacroDto) {
    return 'This action adds a new foodMacro';
  }

  findAll() {
    return `This action returns all foodMacros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodMacro`;
  }

  update(id: number, updateFoodMacroDto: UpdateFoodMacroDto) {
    return `This action updates a #${id} foodMacro`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodMacro`;
  }
}
