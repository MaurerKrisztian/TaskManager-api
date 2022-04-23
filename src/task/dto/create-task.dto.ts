import {ITask} from "../schemas/task.schema";

export class CreateTaskDto implements ITask {
    createdAt: Date;
    description: string;
    isCompleted: boolean;
    title: string;
    userId: string;
    boardId: string;
    labels: string[];
    startAt: Date;
}
