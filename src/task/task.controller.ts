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
import {ApiTags} from "@nestjs/swagger";
import {TaskRepository} from "./schemas/task.repository";
import {TaskboardService} from "../taskboard/taskboard.service";

@ApiTags('task')
@Controller('task')
export class TaskController {
    private readonly logger = new Logger(TaskController.name);

    constructor(private readonly taskboardService:TaskboardService,
        private readonly taskService: TaskService, private readonly taskRepository: TaskRepository) {
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @User() user: IUser) {
        createTaskDto['userId'] = user.id;
        return this.taskService.create(createTaskDto, user.id);
    }

    @Get()
    findAll(@User() user: IUser) {
        return this.taskService.getTimelineTasks(user.id);
    }

    @Get("label/:name")
    getTasksByLabels(@User() user: IUser, @Param('name') labelName: string) {
        return this.taskRepository.find({labels: {$all: [labelName]}})
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
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @User() user: IUser) {
        if (updateTaskDto.boardId) {
            await this.taskboardService.moveTask(id, updateTaskDto.boardId, 0);
        }
        return this.taskService.update(id, updateTaskDto, user.id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }
}
