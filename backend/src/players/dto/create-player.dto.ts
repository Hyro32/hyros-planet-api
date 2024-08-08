import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { Ranks } from 'src/common/types';

export class CreatePlayerDto {
  @IsString()
  uuid: string;

  @IsString()
  @IsEnum(Ranks)
  @IsOptional()
  rank: string;

  @IsDateString()
  @IsOptional()
  rank_expiration: Date;

  @IsDateString()
  @IsOptional()
  first_joined: Date;

  @IsDateString()
  @IsOptional()
  last_joined: Date;
}
