import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import {LabelRepository} from "./schemas/label.repository";
import {IUser, User} from "../auth/auth.user.decorator";

@Controller('label')
export class LabelController {
    constructor(private readonly labelService: LabelService, private readonly labelRepository: LabelRepository) {}

  @Post()
    create(@Body() createLabelDto: CreateLabelDto, @User() user: IUser) {
        return this.labelRepository.create({...createLabelDto, ...{userId: user.id}});
    }

  @Get()
  findAll(@User() user: IUser) {
      return this.labelRepository.find({userId: user.id})
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: IUser) {
      return this.labelRepository.find({_id: id, userId: user.id})
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto, @User() user: IUser) {
      return  this.labelRepository.update(id, updateLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
      return this.labelRepository.remove(id);
  }
}
