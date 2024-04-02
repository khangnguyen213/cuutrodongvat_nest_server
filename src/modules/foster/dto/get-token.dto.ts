import { IsEmail, IsString } from 'class-validator';

export class GetTokenDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
