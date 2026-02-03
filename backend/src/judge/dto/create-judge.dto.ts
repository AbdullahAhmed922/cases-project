import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJudgeDto {
  @IsString()
  @IsNotEmpty()
  judgeName: string;

  @IsString()
  @IsNotEmpty()
  caseType: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
