import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './schemas/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const users = await this.userRepository.find({
      username: createUserDto.username,
    });
    if (users.length > 0)
      throw new HttpException(
        'Username is not available',
        HttpStatus.FORBIDDEN,
      );
    return this.userRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async findOneByName(name: string) {
    return this.userRepository.findOneByName(name);
  }
}
