import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { CreateBanDto } from './dto/create-ban.dto';
import { UpdateBanDto } from './dto/update-ban.dto';

@Controller('moderation')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Post('ban')
  create(@Body() createBanDto: CreateBanDto) {
    return this.moderationService.createBan(createBanDto);
  }

  @Get('ban')
  findAllBans() {
    return this.moderationService.findAllBans();
  }

  @Get('ban/:uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.moderationService.findOneBan(uuid);
  }

  @Patch('ban/:uuid')
  update(@Param('uuid') uuid: string, @Body() updateBanDto: UpdateBanDto) {
    return this.moderationService.updateBan(uuid, updateBanDto);
  }

  @Delete('ban/:uuid')
  remove(@Param('uuid') uuid: string) {
    return this.moderationService.removeBan(uuid);
  }
}
