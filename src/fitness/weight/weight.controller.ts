import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeightService } from './weight.service';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';
import {WeightRepository} from "./schemas/weight.repository";
import {IUser, User} from "../../auth/auth.user.decorator";

@Controller('weight')
export class WeightController {
    constructor(private readonly weightService: WeightService, private readonly weightRepository: WeightRepository) {}

  @Post()
    create(@Body() createWeightDto: CreateWeightDto,  @User() user: IUser) {
        createWeightDto.userId = user.id;
        return this.weightRepository.create(createWeightDto);
    }

  @Get()
  findAll(@User() user: IUser) {
      return this.weightRepository.find({userId: user.id});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
      return this.weightRepository.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeightDto: UpdateWeightDto) {
      return this.weightRepository.update(id, updateWeightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
      return this.weightRepository.remove(id);
  }
}
