import { IsOptional, IsString } from 'class-validator';

export class CreateBanDto {
  @IsString()
  uuid: string;

  @IsString()
  operator: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  expires: Date;
}
