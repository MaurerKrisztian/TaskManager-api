import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseInterceptors,
    UploadedFile,
    StreamableFile,
    Res,
} from '@nestjs/common';
import { FileService } from './file.service';
import {ApiConsumes, ApiTags} from '@nestjs/swagger';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('files')
@ApiTags('files')
export class FileController {
    constructor(private readonly fileService: FileService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true })
  @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
    @Param('id') id: string,
    @Body() data: any,
    @UploadedFile() file: any,
    ): Promise<string | any> {
        return file.id;
    }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
      const info = await this.fileService.findInfo(id);
      res.header(
          'Content-Disposition',
          `attachment; filename="${info.filename}"`,
      );
      const readStream = await this.fileService.readStream(id);
      new StreamableFile(readStream).getStream().pipe(res);
  }

  @Get(':id/info')
  async getInfo(@Param('id') id: string) {
      return this.fileService.findInfo(id);
  }
}
