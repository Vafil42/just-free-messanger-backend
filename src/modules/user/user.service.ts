import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './user.dto';
import { validateOrThrow } from 'src/utils/validate';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto) {
    await validateOrThrow(dto);
    const user = new this.userModel(dto);

    return user.save();
  }

  async findAll() {
    const documents = await this.userModel.find();
    return documents;
  }

  async findOne(id: string) {
    const user = await this.findOneUnsafe(id);

    if (!user) throw new BadRequestException('User not found');

    return user;
  }

  async findOneUnsafe(id: string) {
    return this.userModel.findById(id);
  }

  async findOneByUsernameUnsafe(username: string) {
    return this.userModel.findOne({ username });
  }
}
