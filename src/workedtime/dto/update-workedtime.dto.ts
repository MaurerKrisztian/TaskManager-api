import { PartialType } from '@nestjs/swagger';
import { CreateWorkedtimeDto } from './create-workedtime.dto';

export class UpdateWorkedtimeDto extends PartialType(CreateWorkedtimeDto) {}
