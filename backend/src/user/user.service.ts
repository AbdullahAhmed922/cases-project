/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // async uploadDocument(caseid:string, userId:string, documents:string): Promise<User> {
  //   const user = await this.userModel.findById(userId).exec();
  //   if (!user) throw new NotFoundException('User not found');

  //   if(!user.documents) {
  //     user.documents = [];
  //   }

  async update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async patch(id: string, patchUserDto: Partial<CreateUserDto>): Promise<User> {
    const patchedUser = await this.userModel.findByIdAndUpdate(id, patchUserDto, { new: true });
    if (!patchedUser)  throw new NotFoundException('User not found');
    return patchedUser;
  }
  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundException('User not found');
    return deletedUser;
  }
}
