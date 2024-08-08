import { Module } from '@nestjs/common';
import { EconomyService } from './economy.service';
import { EconomyController } from './economy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Economy } from './entities/economy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Economy])],
  controllers: [EconomyController],
  providers: [EconomyService],
  exports: [EconomyService],
})
export class EconomyModule {}
