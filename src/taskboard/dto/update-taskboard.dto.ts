import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskboardDto } from './create-taskboard.dto';

export class UpdateTaskboardDto extends PartialType(CreateTaskboardDto) {}
