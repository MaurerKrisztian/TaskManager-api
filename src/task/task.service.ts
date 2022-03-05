import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {TaskRepository} from "./schemas/task.repository";
import {TaskboardRepository} from "../taskboard/schemas/Taskboard.repository";

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository, private readonly boardRepository: TaskboardRepository) {
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskRepository.create(createTaskDto);
    await this.boardRepository.addTaskToBoard(task.boardId, task._id)
    return task
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  getBordTasks(boardId: string) {
    return this.taskRepository.find({boardId: boardId});
  }
}
