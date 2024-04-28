import { getValue, setValue } from '../../cache';
import { CachePrefixes } from '../../cache/prefixes';
import { Player } from '../../common';
import { PlayerModel } from '../../database/models';

export class PlayersService {
  async getPlayers(): Promise<Player[]> {
    return await PlayerModel.find();
  }

  async getPlayer(uuid: string, set: any): Promise<Player | null> {
    const player = await PlayerModel.findOne({ uuid });
    
    if (!player) {
      set.status = 404;
      throw new Error('Player not found');
    }

    return player as Player;
  }

  async createPlayer(body: Player): Promise<void> {
    await PlayerModel.create(body);
  }

  async updatePlayer(
    uuid: string,
    body: { locale?: string; rank?: string; last_joined?: Date },
  ): Promise<void> {
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

  async getLocale(key: string, set: any): Promise<unknown> {
    const locale = await getValue(CachePrefixes.LOCALES + key);
    
    if (!locale) {
      set.status = 404;
      throw new Error('Locale for this player not found in cache');
    }

    return locale;
  }
}
