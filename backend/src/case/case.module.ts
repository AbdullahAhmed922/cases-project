/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Case, CaseSchema } from './case.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { Assignment, AssignmentSchema } from '../assignment/assignment.schema';

@Module({
     imports: [
    MongooseModule.forFeature([
      { name: Case.name, schema: CaseSchema },
      { name: Assignment.name, schema: AssignmentSchema },
    ])
  ],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
