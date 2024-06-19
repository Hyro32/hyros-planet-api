import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.playersService.findOne(uuid);
  }

  @Get(':rank')
  findByRank(@Param('rank') rank: string) {
    return this.playersService.findByRank(rank);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playersService.update(uuid, updatePlayerDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.playersService.remove(uuid);
  }
}
