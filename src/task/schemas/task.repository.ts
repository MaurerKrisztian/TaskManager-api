import { CrudService } from '../../services/crud.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

export class TaskRepository extends CrudService<TaskDocument> {
    constructor(
    @InjectModel(Task.name) protected readonly taskModel: Model<TaskDocument>,
    ) {
        super(taskModel);
    }

    async getTimelineTasks(userId: string) {
        const tasksWithDate = await this.taskModel
            .find({
                userId: userId,
                startAt: {$exists: true},
                isCompleted: false,
            })
            .sort('startAt')
            .exec();
        const tasksWithNoBoard = await this.taskModel
            .find({
                userId: userId,
                startAt: {$exists: false},
                boardId: {$exists: false},
                isCompleted: false,
            })
            .sort('startAt')
            .exec();

        return [...tasksWithDate, ...tasksWithNoBoard]
    }

    findOneAndUpdate(id: string, update: any) {
        return this.taskModel.findOneAndUpdate({ _id: id }, update);
    }
}
