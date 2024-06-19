import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ban } from './entities/ban.entity';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ban]), PlayersModule],
  controllers: [ModerationController],
  providers: [ModerationService],
})
export class ModerationModule {}
