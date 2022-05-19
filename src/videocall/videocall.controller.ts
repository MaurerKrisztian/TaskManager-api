import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideocallService } from './videocall.service';
import {CreateMeetingDto} from './dto/create-videocall.dto';
import { UpdateVideocallDto } from './dto/update-videocall.dto';

@Controller('videocall')
export class VideocallController {
    constructor(private readonly videocallService: VideocallService) {}

  @Post()
    create(@Body() createMeetingDto: CreateMeetingDto) {
        return this.videocallService.create(createMeetingDto);
    }

  @Get()
  findAll() {
      return this.videocallService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
      return this.videocallService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideocallDto: UpdateVideocallDto) {
      return this.videocallService.update(+id, updateVideocallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
      return this.videocallService.remove(+id);
  }
}
