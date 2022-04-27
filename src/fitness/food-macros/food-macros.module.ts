import { Module } from '@nestjs/common';
import { FoodMacrosService } from './food-macros.service';
import { FoodMacrosController } from './food-macros.controller';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {FoodMacros, FoodMacrosSchema} from "./schemas/foodMacros.schema";
import {FoodMacrosRepository} from "./schemas/foodMacros.repository";

@Module({
    imports: [ConfigModule,
        MongooseModule.forFeature([
            {
                name: FoodMacros.name,
                schema: FoodMacrosSchema,
            },
        ]),],
    controllers: [FoodMacrosController],
    providers: [FoodMacrosService, FoodMacrosRepository]
})
export class FoodMacrosModule {}
