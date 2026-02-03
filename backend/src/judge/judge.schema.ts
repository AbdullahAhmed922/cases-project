/* eslint-disable prettier/prettier */
import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type JudgeDocument = Judge & Document;

@Schema()
export class Judge {
    @Prop({ required: true })
    judgeName: string;

    @Prop({ required: true })
    caseType: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    status: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    userId: Types.ObjectId;
}

export const JudgeSchema = SchemaFactory.createForClass(Judge)