import { Module } from '@nestjs/common';
import { TaskboardService } from './taskboard.service';
import { TaskboardController } from './taskboard.controller';

@Module({
  controllers: [TaskboardController],
  providers: [TaskboardService]
})
export class TaskboardModule {}
