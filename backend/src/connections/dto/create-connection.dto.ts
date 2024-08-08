import { IsOptional, IsString } from 'class-validator';

export class CreateConnectionDto {
  @IsString()
  uuid: string;

  @IsString()
  @IsOptional()
  discord: string;
}
