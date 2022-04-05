import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogsSchema } from './schemas/logs.schema';
import { LogsRepository } from './schemas/logs.repository';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Log.name,
        schema: LogsSchema,
      },
    ]),
  ],
  controllers: [LogsController],
  providers: [LogsService, LogsRepository],
  exports: [LogsRepository, LogsService],
})
export class LogsModule {}
