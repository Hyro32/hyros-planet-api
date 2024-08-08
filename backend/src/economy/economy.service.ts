import { Injectable } from '@nestjs/common';
import { CreateEconomyDto } from './dto/create-economy.dto';
import { UpdateEconomyDto } from './dto/update-economy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Economy } from './entities/economy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EconomyService {
  constructor(
    @InjectRepository(Economy) private economyRepository: Repository<Economy>,
  ) {}

  async create(createEconomyDto: CreateEconomyDto): Promise<Economy> {
    if (await this.findOne(createEconomyDto.uuid)) {
      throw new Error('Economy already exists');
    }

    const economy = this.economyRepository.create(createEconomyDto);
    return this.economyRepository.save(economy);
  }

  findAll(): Promise<Economy[]> {
    return this.economyRepository.find();
  }

  findOne(uuid: string): Promise<Economy> {
    return this.economyRepository.findOneBy({ uuid });
  }

  update(uuid: string, updateEconomyDto: UpdateEconomyDto): Promise<unknown> {
    return this.economyRepository.update(uuid, updateEconomyDto);
  }

  remove(uuid: string): Promise<unknown> {
    return this.economyRepository.delete(uuid);
  }
}
