import { getValue, setValue } from '../../cache';
import { CachePrefixes } from '../../cache/prefixes';
import { Player } from '../../common';
import { PlayerModel } from '../../database/models';

export class PlayersService {
  async getPlayers(): Promise<Player[]> {
    return await PlayerModel.find();
  }

  async getPlayer(uuid: string): Promise<Player | null> {
    return await PlayerModel.findOne({ uuid });
  }

  async createPlayer(body: Player): Promise<void> {
    await PlayerModel.create(body);
  }

  async updatePlayer(uuid: string, body: Player): Promise<void> {
    await PlayerModel.findOneAndUpdate({ uuid }, body);
  }

  async deletePlayer(uuid: string): Promise<void> {
    await PlayerModel.findOneAndDelete({ uuid });
  }

  // Cache management (locales)
  async setLocale(body: { uuid: string; locale: string }): Promise<void> {
    const { uuid, locale } = body;
    await setValue(CachePrefixes.LOCALES + uuid, locale);
  }

  async getLocale(key: string): Promise<unknown> {
    return await getValue(key);
  }
}
