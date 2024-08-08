import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EconomyService } from './economy.service';
import { CreateEconomyDto } from './dto/create-economy.dto';
import { UpdateEconomyDto } from './dto/update-economy.dto';

@Controller('eco')
export class EconomyController {
  constructor(private readonly economyService: EconomyService) {}

  @Post()
  create(@Body() createEconomyDto: CreateEconomyDto) {
    return this.economyService.create(createEconomyDto);
  }

  @Get()
  findAll() {
    return this.economyService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.economyService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateEconomyDto: UpdateEconomyDto,
  ) {
    return this.economyService.update(uuid, updateEconomyDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.economyService.remove(uuid);
  }
}
