import { Controller, Get } from '@nestjs/common';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
    findAll() {
        return ""
    }

}
