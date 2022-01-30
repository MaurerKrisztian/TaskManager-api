import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserRepository} from "./schemas/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }
  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto)
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.userRepository.findOne(id)
  }

  async findOneByName(name: string) {
    return this.userRepository.findOneByName(name)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
