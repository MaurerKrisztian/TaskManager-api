import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {Label, LabelSchema} from "./schemas/label.schema";
import {LabelRepository} from "./schemas/label.repository";

@Module({
    imports: [ConfigModule,
        MongooseModule.forFeature([
            {
                name: Label.name,
                schema: LabelSchema,
            },
        ]),],
    controllers: [LabelController],
    providers: [LabelService, LabelRepository]
})
export class LabelModule {}
