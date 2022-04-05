import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { IGridFSObject, MongoGridFS } from 'mongo-gridfs';
import { GridFSBucketReadStream } from 'mongodb';

@Injectable()
export class FileService {
  private fileModel: MongoGridFS;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async writeFile(stream: any): Promise<IGridFSObject> {
    return await this.fileModel.writeFileStream(stream, {
      filename: 'testfile.txt',
    });
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    const result = await this.fileModel
      .findById(id)
      .catch(() => {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      })
      .then((result) => result);
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType,
    };
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.fileModel.delete(id);
  }
}

export class FileInfoVm {
  length: number;

  chunkSize: number;

  filename: string;

  md5: string;

  contentType: string;
}
