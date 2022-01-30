import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskboardService } from './taskboard.service';
import { CreateTaskboardDto } from './dto/create-taskboard.dto';
import { UpdateTaskboardDto } from './dto/update-taskboard.dto';

@Controller('taskboard')
export class TaskboardController {
  constructor(private readonly taskboardService: TaskboardService) {}

  @Post()
  create(@Body() createTaskboardDto: CreateTaskboardDto) {
    return this.taskboardService.create(createTaskboardDto);
  }

  @Get()
  findAll() {
    return this.taskboardService.findAll();
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
    return this.taskboardService.remove(+id);
  }
}
