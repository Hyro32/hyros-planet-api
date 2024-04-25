import { t } from 'elysia';
import { Locales, PlayerUuid, Ranks } from '../../../common';

export const CreatePlayerDto = t.Object({
  uuid: PlayerUuid,
  locale: t.Enum(Locales),
  rank: t.Enum(Ranks),
  first_joined: t.Date(),
  last_joined: t.Optional(t.Date()),
});
