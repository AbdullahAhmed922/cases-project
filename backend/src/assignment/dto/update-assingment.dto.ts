/* eslint-disable prettier/prettier */
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateAssignmentDto {
    @IsMongoId()
    @IsOptional()
    caseId?: string;

    @IsMongoId()
    @IsOptional()
    judgeId?: string;
}