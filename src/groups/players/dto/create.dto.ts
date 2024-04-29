import { t } from 'elysia';
import { Locales, PlayerUuid, Ranks } from '../../../common';

export interface ICreatePlayerDto {
  uuid: string;
  locale?: Locales;
  rank?: Ranks;
  first_joined: Date;
  last_joined?: Date;
}

export const CreatePlayerDto = t.Object({
  uuid: PlayerUuid,
  locale: t.Optional(t.Enum(Locales)),
  rank: t.Optional(t.Enum(Ranks)),
  first_joined: t.Date(),
  last_joined: t.Optional(t.Date()),
});
