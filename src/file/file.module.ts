import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import {FileService} from "./file.service";
import {MulterModule} from "@nestjs/platform-express";
import {GridFsMulterOptionsFactory} from "./gridfs-multer-options.factory";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterOptionsFactory,
    }),

    MongooseModule.forRoot(process.env.DB_URI),
  ],
  controllers: [FileController],
  providers: [FileService, GridFsMulterOptionsFactory]
})
export class FileModule {}
