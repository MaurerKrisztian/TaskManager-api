import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskRepository } from './schemas/task.repository';
import { TaskboardModule } from '../taskboard/taskboard.module';
import {LabelRepository} from "../label/schemas/label.repository";
import {Label, LabelSchema} from "../label/schemas/label.schema";

@Module({
    imports: [
        TaskboardModule,
        ConfigModule,
        MongooseModule.forFeature([
            {
                name: Task.name,
                schema: TaskSchema,
            },
            {
                name: Label.name,
                schema: LabelSchema,
            },
        ]),
        TaskboardModule,
    ],
    controllers: [TaskController],
    providers: [TaskService, TaskRepository, LabelRepository],
    exports: [TaskService, TaskRepository],
})
export class TaskModule {}
