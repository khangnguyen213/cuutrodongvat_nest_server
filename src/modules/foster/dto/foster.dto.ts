import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateFosterDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  address: string = '';

  @IsUrl({ require_tld: false })
  @IsOptional()
  avatar: string = `${process.env.SERVER_URL}/avatar_default.png`;

  @IsString()
  password: string;
}

export class UpdateFosterDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  avatar: string;
}
