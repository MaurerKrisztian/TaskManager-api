import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {DocumentBuilder} from "@nestjs/swagger";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

  @Get()
    getHello() {
        return new DocumentBuilder()
            .setTitle('TaskManager doc')
            .setDescription('The TaskManager API description')
            .setVersion("d")
            .build();
    }
}
