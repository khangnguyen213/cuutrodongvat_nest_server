import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePetDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  species: string;

  @IsString()
  color: string;

  @IsNumber()
  gender: number;

  @IsString()
  age: string;

  @IsBoolean()
  sterilization: boolean;

  @IsBoolean()
  vacine: boolean;

  @IsString()
  @IsOptional()
  date: string;

  @IsBoolean()
  @IsOptional()
  adopted: boolean = false;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsArray()
  questions: {
    id: string;
    content: string;
  }[];
}
