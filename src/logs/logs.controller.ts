import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get(':userId')
  findByUser(@Param('userId') userId: string, @Query('type') type = 'login') {
    return this.logsService.getLogsByType(userId, type);
  }

  // todo admin
  @Get()
  findAll(@Query('type') type: string, @Query('limit') limit: number) {
    return this.logsService.getAll(type, limit);
  }
}
