import { Adopt_Status } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateAdoptDto {
  @IsString()
  name: string;

  @IsString()
  contact1: string;

  @IsString()
  @IsOptional()
  contact2?: string;

  @IsString()
  petId: string;

  @IsArray()
  answers: {
    questionId: number;
    content: string;
  }[];
}

export class UpdateStatusDto {
  @IsEnum(Adopt_Status)
  status: Adopt_Status;
}
