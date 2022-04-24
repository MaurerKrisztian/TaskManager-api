import { Module } from '@nestjs/common';
import { WeightService } from './weight.service';
import { WeightController } from './weight.controller';
import {WeightRepository} from "./schemas/weight.repository";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {Weight, WeightSchema} from "./schemas/weight.schema";

@Module({
    imports: [ConfigModule,
        MongooseModule.forFeature([
            {
                name: Weight.name,
                schema: WeightSchema,
            },
        ]),],
    controllers: [WeightController],
    providers: [WeightService, WeightRepository]
})
export class WeightModule {}
