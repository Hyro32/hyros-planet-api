import { Injectable } from '@nestjs/common';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';
import { CachingService } from 'src/caching/caching.service';
import { Connection } from './entities/connection.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheKeys } from 'src/common/contants';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection)
    private connectionsRepository: Repository<Connection>,
    private readonly cachingService: CachingService,
  ) {}

  create(createConnectionDto: CreateConnectionDto): Promise<Connection> {
    if (this.findOne(createConnectionDto.uuid)) {
      throw new Error('Connection already exists');
    }

    const connection = this.connectionsRepository.create(createConnectionDto);
    return this.connectionsRepository.save(connection);
  }

  requestDiscord(uuid: string): Promise<unknown> {
    if (this.cachingService.getKey(CacheKeys.CONNECTIONS_DISCORD + uuid)) {
      throw new Error('Request already sent');
    }

    this.cachingService.setKeyWithTTL(
      CacheKeys.CONNECTIONS_DISCORD + uuid,
      this.generateRandomSixDigitNumber(),
      60 * 5 * 1000,
    );

    return this.cachingService.getKey(CacheKeys.CONNECTIONS_DISCORD + uuid);
  }

  findAll(): Promise<Connection[]> {
    return this.connectionsRepository.find();
  }

  findOne(uuid: string): Promise<Connection> {
    return this.connectionsRepository.findOneBy({ uuid });
  }

  update(
    uuid: string,
    updateConnectionDto: UpdateConnectionDto,
  ): Promise<unknown> {
    return this.connectionsRepository.update(uuid, updateConnectionDto);
  }

  remove(uuid: string): Promise<unknown> {
    return this.connectionsRepository.delete(uuid);
  }

  private generateRandomSixDigitNumber(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
