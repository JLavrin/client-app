import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator'

export class CustomerCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('PL')
  phone: string;

  @IsString()
  house: string;

  @IsString()
  apartment: string;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  zip: string;

  @IsInt()
  nip: string;

  @IsInt()
  regon: string;

  @IsNotEmpty()
  @IsString()
  founder: string;

  @IsString()
  founder2: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
