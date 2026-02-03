/* eslint-disable prettier/prettier */
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateAssignmentDto {
    @IsMongoId()
    @IsNotEmpty()
    caseId: string;

    @IsMongoId()
    @IsNotEmpty()
    userId: string;
}