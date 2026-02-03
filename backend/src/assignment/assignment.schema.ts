/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Case } from '../case/case.schema';
import { User } from '../user/user.schema';
import { Judge } from '../judge/judge.schema';

export type AssignmentDocument = Assignment & Document;

@Schema({ timestamps: true })
export class Assignment {
  @Prop({ type: Types.ObjectId, ref: 'Case', required: true })
  caseId: Case;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: Types.ObjectId, ref: 'Judge' })
  assignedBy?: Judge;


  @Prop({ default: 'PENDING', enum: ['PENDING', 'ACCEPTED', 'COMPLETED', 'REJECTED'] })
  status: string;

  @Prop()
  notes: string;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
