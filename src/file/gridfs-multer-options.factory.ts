import {
    MulterModuleOptions,
    MulterOptionsFactory,
} from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DATABASE } from '../services/config/constants';

import { GridFsStorage } from 'multer-gridfs-storage/lib/gridfs';

@Injectable()
export class GridFsMulterOptionsFactory implements MulterOptionsFactory {
    private readonly gridFsStorage: GridFsStorage;

    constructor(private readonly configs: ConfigService) {
        const dbConfig: MongooseModuleOptions =
      configs.get<MongooseModuleOptions>(DATABASE);
        this.gridFsStorage = new GridFsStorage({
            url: process.env.DB_URI,
            file: (req, file) => {
                return {
                    ...file,
                    filename: file.originalname?.trim(),
                };
            },
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}
