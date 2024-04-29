import { User } from '../../common';
import { UsersModel } from '../../database/models';
import { ICreateUserDto } from './dto/create.dto';
import { IUpdateUserDto } from './dto/update.dto';

export class UsersService {
  async getUsers(): Promise<User[]> {
    return await UsersModel.find();
  }

  async getUser(id: string, set: any): Promise<User> {
    const user = await UsersModel.findOne({ _id: id });

    if (!user) {
      set.status = 404;
      throw new Error('User not found');
    }

    return user;
  }

  async getUserByEmail(email: string, set: any): Promise<User> {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      set.status = 404;
      throw new Error('User not found');
    }

    return user;
  }

  async createUser(body: ICreateUserDto): Promise<void> {
    await UsersModel.create(body);
  }

  async updateUser(id: string, body: IUpdateUserDto): Promise<void> {
    await UsersModel.findOneAndUpdate({ _id: id }, body)
  }

  async deleteUser(id: string): Promise<void> {
    await UsersModel.deleteOne({ _id: id });
  }
}
