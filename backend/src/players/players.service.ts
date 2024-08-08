import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playersRepository: Repository<Player>,
  ) {}

  create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = this.playersRepository.create(createPlayerDto);
    return this.playersRepository.save(player);
  }

  findAll(): Promise<Player[]> {
    return this.playersRepository.find({
      relations: {
        economy: true,
      },
    });
  }

  findOne(uuid: string): Promise<Player> {
    return this.playersRepository.findOneBy({ uuid });
  }

  findByRank(rank: string): Promise<Player[]> {
    return this.playersRepository.findBy({ rank });
  }

  update(uuid: string, updatePlayerDto: UpdatePlayerDto): Promise<unknown> {
    return this.playersRepository.update(uuid, updatePlayerDto);
  }

  remove(uuid: string): Promise<unknown> {
    return this.playersRepository.delete(uuid);
  }
}
