import { Injectable } from '@nestjs/common';
import { CreateTaskboardDto } from './dto/create-taskboard.dto';
import { UpdateTaskboardDto } from './dto/update-taskboard.dto';
import { TaskboardRepository } from './schemas/Taskboard.repository';

@Injectable()
export class TaskboardService {
    constructor(private readonly taskboardRepository: TaskboardRepository) {}

    create(createTaskboardDto: CreateTaskboardDto) {
        return this.taskboardRepository.create(createTaskboardDto);
    }

    findByUserId(id: string) {
        return this.taskboardRepository.find({ userId: id });
    }

    findOne(id: string) {
        return this.taskboardRepository.findOne(id);
    }

    update(id: number, updateTaskboardDto: UpdateTaskboardDto) {
        return `This action updates a #${id} taskboard`;
    }

    remove(id: string) {
    // todo: remove all task
        return this.taskboardRepository.remove(id);
    }

    findByUserAndPopulate(id: string) {
        return this.taskboardRepository.findByUserAndPopulate(id);
    }

    moveTask(taskId: string, toBoardId: string, index: number) {
        return this.taskboardRepository.moveTask(taskId, toBoardId, index);
    }
}
