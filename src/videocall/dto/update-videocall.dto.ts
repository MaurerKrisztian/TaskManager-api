import { PartialType } from '@nestjs/swagger';
import { CreateVideocallDto } from './create-videocall.dto';

export class UpdateVideocallDto extends PartialType(CreateVideocallDto) {}
