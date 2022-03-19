import { Injectable } from '@nestjs/common';
import { CreateWorkedtimeDto } from './dto/create-workedtime.dto';
import { UpdateWorkedtimeDto } from './dto/update-workedtime.dto';

@Injectable()
export class WorkedtimeService {
  create(createWorkedtimeDto: CreateWorkedtimeDto) {
    return 'This action adds a new workedtime';
  }

  findAll() {
    return `This action returns all workedtime`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workedtime`;
  }

  update(id: number, updateWorkedtimeDto: UpdateWorkedtimeDto) {
    return `This action updates a #${id} workedtime`;
  }

  remove(id: number) {
    return `This action removes a #${id} workedtime`;
  }
}
