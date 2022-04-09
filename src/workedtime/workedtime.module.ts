import { Module } from '@nestjs/common';
import { WorkedtimeService } from './workedtime.service';
import { WorkedtimeController } from './workedtime.controller';
import { WorkedtimeRepository } from './schemas/workedtime.repository';
import { Workedtime, WorkedtimeSchema } from './schemas/workedtime.schema';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from '../task/task.module';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([
            { name: Workedtime.name, schema: WorkedtimeSchema },
        ]),
        TaskModule,
    ],
    controllers: [WorkedtimeController],
    providers: [WorkedtimeService, WorkedtimeRepository],
})
export class WorkedtimeModule {}
