import { PartialType } from '@nestjs/swagger';
import { CreateWeightDto } from './create-weight.dto';

export class UpdateWeightDto extends PartialType(CreateWeightDto) {}
