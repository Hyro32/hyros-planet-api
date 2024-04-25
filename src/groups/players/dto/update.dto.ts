import { t } from 'elysia';
import { Locales, Ranks } from '../../../common';

export const UpdatePlayerDto = t.Object({
  locale: t.Optional(t.Enum(Locales)),
  rank: t.Optional(t.Enum(Ranks)),
  last_joined: t.Optional(t.Date()),
});
