import { Injectable } from '@nestjs/common';
import { CreateBanDto } from './dto/create-ban.dto';
import { UpdateBanDto } from './dto/update-ban.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ban } from './entities/ban.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModerationService {
  constructor(@InjectRepository(Ban) private banRepository: Repository<Ban>) {}

  createBan(createBanDto: CreateBanDto): Promise<Ban> {
    const databasean = this.findOneBan(createBanDto.uuid);
    if (databasean) throw new Error('Ban already exists');
    const ban = this.banRepository.create(createBanDto);
    return this.banRepository.save(ban);
  }

  findOneBan(uuid: string): Promise<Ban> {
    return this.banRepository.findOneBy({ uuid });
  }

  updateBan(uuid: string, updateBanDto: UpdateBanDto): Promise<unknown> {
    return this.banRepository.update(uuid, updateBanDto);
  }

  removeBan(uuid: string): Promise<unknown> {
    return this.banRepository.delete({ uuid });
  }

  findAllBans(): Promise<Ban[]> {
    return this.banRepository.find();
  }
}
