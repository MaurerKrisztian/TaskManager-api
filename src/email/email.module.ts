import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import {ConfigModule} from "@nestjs/config";
import {TaskModule} from "../task/task.module";

@Module({
  imports: [ConfigModule, TaskModule],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
