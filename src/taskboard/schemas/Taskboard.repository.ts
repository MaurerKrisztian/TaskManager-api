import {CrudService} from '../../services/crud.service';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {TaskBoard, TaskBoardDocument} from "./Taskboard.schema";
import {Injectable} from "@nestjs/common";

@Injectable()
export class TaskboardRepository extends CrudService<TaskBoardDocument> {
    constructor(@InjectModel(TaskBoard.name) protected readonly boardModel: Model<TaskBoardDocument>) {
        super(boardModel);
    }

    findOneByName(name: string) {
        return this.boardModel.findOne({username: name})
    }

    async findByUserAndPopulate(id: string): Promise<TaskBoardDocument[]> {
        return this.Model.find({userId: id}).populate('tasks');
    }

    addTaskToBoard(boardId: string, taskId: string) {
        return this.boardModel.findOneAndUpdate({_id: boardId},
            {$push: {tasks: taskId}})
    }

    removeTask(boardId: string, taskId: string){
        return this.boardModel.updateOne({ _id: boardId }, {
            $pullAll: {
                tasks: [taskId],
            },
        });
    }

}
