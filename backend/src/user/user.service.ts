/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Judge, JudgeDocument } from '../judge/judge.schema';
import { Assignment, AssignmentDocument } from '../assignment/assignment.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Judge.name) private judgeModel: Model<JudgeDocument>,
    @InjectModel(Assignment.name) private assignmentModel: Model<AssignmentDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    if (createUserDto.role === 'judge') {
      await this.judgeModel.create({ 
        userId: user._id,
        judgeName: createUserDto.name, 
        caseType: 'default', 
        status: 'active' });

    }
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

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

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
    const userObjectId = new Types.ObjectId(id);
    await this.judgeModel.deleteMany({ userId: userObjectId }).exec();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.assignmentModel.deleteMany({ userId: userObjectId } as any).exec();
    return deletedUser;
  }
}
