/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Judge, JudgeDocument } from './judge.schema';
import { CreateJudgeDto } from './dto/create-judge.dto';

@Injectable()
export class JudgeService {
    constructor(@InjectModel(Judge.name) private judgeModel: Model<JudgeDocument>) {}

    async create(createJudgeDto: CreateJudgeDto): Promise<Judge> {
        const judge = new this.judgeModel(createJudgeDto);
        return judge.save();
    }
    async findAll(): Promise<Judge[]> {
        return this.judgeModel.find().exec();
    }
    async findOne(id: string):Promise<Judge> {
        const judge = await this.judgeModel.findById(id).exec();
        if(!judge) throw new NotFoundException('Judge not found');
        return judge;
    }
    async update(id: string, createJudgeDto: CreateJudgeDto): Promise<Judge> {
        const updatedJudge = await this.judgeModel.findByIdAndUpdate(id, createJudgeDto, { new: true });
        if(!updatedJudge) throw new NotFoundException('Judge not found');
        return updatedJudge;
    }
    async patch(id: string, createJudgeDto: CreateJudgeDto): Promise<Judge> {   
        const patchedJudge = await this.judgeModel.findByIdAndUpdate(id, createJudgeDto, { new: true });
        if(!patchedJudge) throw new NotFoundException('Judge not found');
        return patchedJudge;
    }
    async remove(id: string): Promise<Judge> {
        const deletedJudge = await this.judgeModel.findByIdAndDelete(id);
        if(!deletedJudge) throw new NotFoundException('Judge not found');
        return deletedJudge;
    }
}
