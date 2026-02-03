/* eslint-disable prettier/prettier */
import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CaseDocument = Case & Document;

@Schema({ timestamps: true })
export class Case {
    @Prop({ required: true })
    caseTitle: string;

    @Prop({ required: true })
    caseType: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    status: string;
}

export const CaseSchema = SchemaFactory.createForClass(Case)