import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskboardService } from './taskboard.service';
import { CreateTaskboardDto } from './dto/create-taskboard.dto';
import { UpdateTaskboardDto } from './dto/update-taskboard.dto';
import {IUser, User} from "../auth/auth.user.decorator";

@Controller('taskboard')
export class TaskboardController {
  constructor(private readonly taskboardService: TaskboardService) {}

  @Post()
  create(@Body() createTaskboardDto: CreateTaskboardDto, @User() user: IUser) {
    createTaskboardDto["userId"] = user.id
    return this.taskboardService.create(createTaskboardDto);
  }

  @Get()
  findAll(@User() user: IUser) {
    return this.taskboardService.findByUserAndPopulate(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskboardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskboardDto: UpdateTaskboardDto) {
    return this.taskboardService.update(+id, updateTaskboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskboardService.remove(id);
  }
}
