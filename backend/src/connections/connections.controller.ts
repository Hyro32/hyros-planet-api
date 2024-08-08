import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Post()
  create(@Body() createConnectionDto: CreateConnectionDto) {
    return this.connectionsService.create(createConnectionDto);
  }

  @Get()
  findAll() {
    return this.connectionsService.findAll();
  }

  @Get('discord')
  request(@Body() createConnectionDto: CreateConnectionDto) {
    return this.connectionsService.requestDiscord(createConnectionDto.uuid);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.connectionsService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateConnectionDto: UpdateConnectionDto,
  ) {
    return this.connectionsService.update(uuid, updateConnectionDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.connectionsService.remove(uuid);
  }
}
