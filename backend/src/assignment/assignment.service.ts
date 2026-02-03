/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Assignment } from './assignment.schema';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assingment.dto';

@Injectable()
export class AssignmentService {
    constructor(@InjectModel('Assignment') private readonly assignmentModel: Model<Assignment>) { }

    async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
        const create = new this.assignmentModel(createAssignmentDto)
        return create.save();
    }

    async findAll(): Promise<Assignment[]> {
        return this.assignmentModel.find().exec();
    }

    async findOne(id: string): Promise<Assignment> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Assignment not found');
        const assignment = await this.assignmentModel.findById(id).exec();
        if (!assignment) throw new NotFoundException('Assignment not found');
        return assignment;
    }

    async update(id: string, UpdateAssignmentDto: Partial<UpdateAssignmentDto>): Promise<Assignment> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Assignment not found');
        const updateAssignment = await this.assignmentModel.findByIdAndUpdate(id, UpdateAssignmentDto, { new: true }).exec();
        if (!updateAssignment) throw new NotFoundException('Assignment not found');
        return updateAssignment
    }

    async remove(id: string): Promise<Assignment> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Assignment not found');
        const removed = await this.assignmentModel.findByIdAndDelete(id).exec();
        if (!removed) throw new NotFoundException('Assignment not found');
        return removed;
    }
}