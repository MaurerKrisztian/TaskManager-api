import { CrudService } from '../../services/crud.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

export class UserRepository extends CrudService<UserDocument> {
  constructor(
    @InjectModel(User.name) protected readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  findOneByName(name: string) {
    return this.userModel.findOne({ username: name });
  }
}
