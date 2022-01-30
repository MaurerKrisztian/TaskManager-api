import { Injectable } from '@nestjs/common';
import { CreateTaskboardDto } from './dto/create-taskboard.dto';
import { UpdateTaskboardDto } from './dto/update-taskboard.dto';

@Injectable()
export class TaskboardService {
  create(createTaskboardDto: CreateTaskboardDto) {
    return 'This action adds a new taskboard';
  }

  findAll() {
    return `This action returns all taskboard`;
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
}
