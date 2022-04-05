import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './schemas/task.repository';
import { TaskboardRepository } from '../taskboard/schemas/Taskboard.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly boardRepository: TaskboardRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskRepository.create(createTaskDto);
    if (task.boardId) {
      await this.boardRepository.addTaskToBoard(task.boardId, task._id);
    }
    return task;
  }

  getTimelineTasks(userId: string) {
    return this.taskRepository.getTimelineTasks(userId);
  }

  findOne(id: string) {
    return this.taskRepository.findOne(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: string) {
    const task = await this.taskRepository.findOne(id);
    await this.boardRepository.removeTask(task.boardId, task.id);
    return this.taskRepository.remove(id);
  }

  getBordTasks(boardId: string) {
    return this.taskRepository.find({ boardId: boardId });
  }

  getTodayTask(userId: string) {
    return this.taskRepository.find({
      userId: userId,
      startAt: {
        $gte: new Date(),
        $lt: new Date().setDate(new Date().getDate() + 1),
      },
      isCompleted: false,
    });
  }

  getTodayTaskByEmail(userEmail: string) {
    return this.taskRepository.find({
      username: userEmail,
      startAt: {
        $gte: new Date(),
        $lt: new Date().setDate(new Date().getDate() + 1),
      },
      isCompleted: false,
    });
  }
}
