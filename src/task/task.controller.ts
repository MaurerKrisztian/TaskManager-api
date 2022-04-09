import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Logger,
} from '@nestjs/common';
import {TaskService} from './task.service';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {IUser, User} from '../auth/auth.user.decorator';

@Controller('task')
export class TaskController {
    private readonly logger = new Logger(TaskController.name);

    constructor(private readonly taskService: TaskService) {
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @User() user: IUser) {
        createTaskDto['userId'] = user.id;
        return this.taskService.create(createTaskDto);
    }

    @Get()
    findAll(@User() user: IUser) {
        return this.taskService.getTimelineTasks(user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(id);
    }

    @Get('board/:id')
    getBoardTask(@Param('id') boardId: string) {
        return this.taskService.getBordTasks(boardId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }
}
