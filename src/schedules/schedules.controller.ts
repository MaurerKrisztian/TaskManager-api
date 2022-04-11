import {Controller, Delete, Get, Param} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import {SchedulesRepository} from "./schema/schedules.repository";
import {IUser, User} from "../auth/auth.user.decorator";

@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService, private readonly repo: SchedulesRepository) {}

    @Get()
    findAll(@User() user: IUser) {
        return this.repo.find({userId: user.id})
    }

    @Delete(':id')
    delete(@User() user: IUser, @Param('id') id: string) {
        return this.repo.remove(id);
    }

}
