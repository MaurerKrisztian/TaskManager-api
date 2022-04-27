import { PartialType } from '@nestjs/swagger';
import { CreateFoodMacroDto } from './create-food-macro.dto';

export class UpdateFoodMacroDto extends PartialType(CreateFoodMacroDto) {}
