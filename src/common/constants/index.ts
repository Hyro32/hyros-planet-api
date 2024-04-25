import { t } from 'elysia';

export const PlayerUuid = t.String({
  pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
});

export enum Locales {
  en_US = 'en_US',
  es_ES = 'es_ES',
}

export enum Ranks {
  OWNER = 'owner',
  ADMINISTRATOR = 'administrator',
  MODERATOR = 'moderator',
  DEFAULT = 'default',
}
