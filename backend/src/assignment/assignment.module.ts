/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Assignment, AssignmentSchema } from './assignment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Assignment.name, schema: AssignmentSchema}])
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService]
})
export class AssignmentModule {}
