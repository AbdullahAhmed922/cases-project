/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:'User', schema: UserSchema}])
  ],
  providers: [UsersService],
  controllers: [UserController],
})
export class UserModule {}
