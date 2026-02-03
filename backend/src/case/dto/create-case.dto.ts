/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateCaseDto {
  @IsString()
  @IsNotEmpty()
  caseTitle: string;

  @IsString()
  @IsNotEmpty()
  caseType: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}