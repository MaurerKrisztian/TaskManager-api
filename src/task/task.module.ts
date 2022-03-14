import {Module} from '@nestjs/common';
import {TaskService} from './task.service';
import {TaskController} from './task.controller';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {Task, TaskSchema} from "./schemas/task.schema";
import {TaskRepository} from "./schemas/task.repository";
import {TaskboardModule} from "../taskboard/taskboard.module";
import {EmailModule} from "../email/email.module";

@Module({
    imports: [ConfigModule,
        MongooseModule.forFeature([
            {
                name: Task.name,
                schema: TaskSchema
            }
          ]), TaskboardModule],
    controllers: [TaskController],
    providers: [TaskService, TaskRepository],
    exports: [TaskService]
})
export class TaskModule {
}
