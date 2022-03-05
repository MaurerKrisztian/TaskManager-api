import {CrudService} from '../../services/crud.service';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Task, TaskDocument} from "./task.schema";

export class TaskRepository extends CrudService<TaskDocument> {
    constructor(@InjectModel(Task.name) protected readonly taskModel: Model<TaskDocument>) {
        super(taskModel);
    }

    findOneByName(name: string) {
        return this.taskModel.findOne({username: name})
    }

}
