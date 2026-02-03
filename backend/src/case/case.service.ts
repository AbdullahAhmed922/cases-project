/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCaseDto } from './dto/create-case.dto';
import { Case, CaseDocument } from './case.schema';
import { UpdateCaseDto } from './dto/update-case.dto';

@Injectable()
export class CaseService {
    constructor(@InjectModel(Case.name) private readonly caseModel: Model<CaseDocument>,) { }

    async create(createCaseDto: CreateCaseDto): Promise<Case> {
        const create = new this.caseModel(createCaseDto)
        return create.save();
    }

    async findAll(): Promise<Case[]> {
        return this.caseModel.find().exec();
    }

    async findOne(id: string): Promise<Case> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Case not found')
        const findOne = await this.caseModel.findById(id).exec();
        if (!findOne) throw new NotFoundException('Case not found')
        return findOne;
    }

    async update(id: string, updateCaseDto: Partial<UpdateCaseDto>): Promise<Case> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Case not found')
        const updateCase = await this.caseModel.findByIdAndUpdate(id, updateCaseDto, { new: true }).exec();
        if (!updateCase) throw new NotFoundException('Case not Found')
        return updateCase
    }

    async remove(id:string): Promise<Case>{
        if(!Types.ObjectId.isValid(id)) throw new NotFoundException('Case not found');
        const deleteCase = await this.caseModel.findByIdAndDelete(id).exec();
        if(!deleteCase) throw new NotFoundException('Case Not Found');
        return deleteCase;
    }

    async updateStatus(id: string, status: string): Promise<Case> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Case not found');
        
        // Validate status
        const validStatuses = ['open', 'closed', 'in progress'];
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid status. Must be: open, closed, or in progress');
        }

        const updatedCase = await this.caseModel.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        ).exec();
        
        if (!updatedCase) throw new NotFoundException('Case not found');
        return updatedCase;
    }
}
