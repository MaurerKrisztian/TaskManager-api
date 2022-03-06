import { Module } from '@nestjs/common';
import { TaskboardService } from './taskboard.service';
import { TaskboardController } from './taskboard.controller';
import {TaskboardRepository} from "./schemas/Taskboard.repository";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose"
import {TaskBoard, TaskboardSchema} from "./schemas/Taskboard.schema";

@Module({
  imports: [ConfigModule,
    MongooseModule.forFeature([{name: TaskBoard.name, schema: TaskboardSchema}])],
  controllers: [TaskboardController],
  providers: [TaskboardService, TaskboardRepository],
  exports: [TaskboardRepository]
})
export class TaskboardModule {}
