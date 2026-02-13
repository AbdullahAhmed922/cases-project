/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { JudgeSchema } from '../judge/judge.schema';
import { AssignmentSchema } from '../assignment/assignment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Judge', schema: JudgeSchema },
      { name: 'Assignment', schema: AssignmentSchema },
    ])
  ],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService, MongooseModule],
})
export class UserModule {}
