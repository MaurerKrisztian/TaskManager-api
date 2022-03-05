import {Injectable} from '@nestjs/common';
import {CreateTaskboardDto} from './dto/create-taskboard.dto';
import {UpdateTaskboardDto} from './dto/update-taskboard.dto';
import {TaskboardRepository} from "./schemas/Taskboard.repository";

@Injectable()
export class TaskboardService {
    constructor(private readonly taskboardRepository: TaskboardRepository) {
    }


    create(createTaskboardDto: CreateTaskboardDto) {
        return this.taskboardRepository.create(createTaskboardDto)
    }

    findByUserId(id: string) {
        return this.taskboardRepository.find({userId: id});
    }

    findOne(id: number) {
        return `This action returns a #${id} taskboard`;
    }

    update(id: number, updateTaskboardDto: UpdateTaskboardDto) {
        return `This action updates a #${id} taskboard`;
    }

    remove(id: number) {
        return `This action removes a #${id} taskboard`;
    }

    findByUserAndPopulate(id: string) {
        return this.taskboardRepository.findByUserAndPopulate(id)
    }
}
