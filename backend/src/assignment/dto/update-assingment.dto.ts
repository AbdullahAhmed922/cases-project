/* eslint-disable prettier/prettier */
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateAssignmentDto {
    @IsMongoId()
    @IsOptional()
    caseId?: string;

    @IsMongoId()
    @IsOptional()
    assignedBy?: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    notes?: string;
}