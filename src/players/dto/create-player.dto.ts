import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Ranks } from 'src/common';
import { Player } from '../entities/player.entity';

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

  @IsNumber()
  @IsOptional()
  level: number;

  @IsDateString()
  @IsOptional()
  first_joined: Date;

  @IsDateString()
  @IsOptional()
  last_joined: Date;

  @IsOptional()
  friends: Player[];
}
