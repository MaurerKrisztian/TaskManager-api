import { Injectable } from '@nestjs/common';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';

@Injectable()
export class WeightService {
  create(createWeightDto: CreateWeightDto) {
    return 'This action adds a new weight';
  }

  findAll() {
    return `This action returns all weight`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weight`;
  }

  update(id: number, updateWeightDto: UpdateWeightDto) {
    return `This action updates a #${id} weight`;
  }

  remove(id: number) {
    return `This action removes a #${id} weight`;
  }
}
