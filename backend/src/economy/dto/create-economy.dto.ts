import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEconomyDto {
  @IsString()
  uuid: string;

  @IsNumber()
  @IsOptional()
  purse: number;

  @IsNumber()
  @IsOptional()
  bank: number;
}
