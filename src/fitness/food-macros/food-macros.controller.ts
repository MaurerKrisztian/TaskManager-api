import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { FoodMacrosService } from './food-macros.service';
import {FoodMacrosRepository} from "./schemas/foodMacros.repository";
import {CreateWeightDto} from "../weight/dto/create-weight.dto";
import {IUser, User} from "../../auth/auth.user.decorator";
import {UpdateWeightDto} from "../weight/dto/update-weight.dto";

@Controller('food-macros')
export class FoodMacrosController {
    constructor(private readonly foodMacrosService: FoodMacrosService, private readonly foodMacrosRepo: FoodMacrosRepository) {}

    @Post()
    create(@Body() createWeightDto: CreateWeightDto,  @User() user: IUser) {
        createWeightDto.userId = user.id;
        return this.foodMacrosRepo.create(createWeightDto);
    }

    @Get()
    findAll(@User() user: IUser, @Query('sort') sort) {
        return this.foodMacrosRepo.findSort({userId: user.id}, {date: -1}) ;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.foodMacrosRepo.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateWeightDto: UpdateWeightDto) {
        return this.foodMacrosRepo.update(id, updateWeightDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.foodMacrosRepo.remove(id);
    }
}
