/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JudgeController } from './judge.controller';
import { JudgeService } from './judge.service';
import { JudgeSchema } from './judge.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name:'Judge' , schema: JudgeSchema}])
  ],
  controllers: [JudgeController],
  providers: [JudgeService]
})
export class JudgeModule {}

