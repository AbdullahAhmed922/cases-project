/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class UpdateCaseDto {
  @IsString()
  @IsOptional()
  caseTitle?: string;

  @IsString()
  @IsOptional()
  caseType?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: string;
}