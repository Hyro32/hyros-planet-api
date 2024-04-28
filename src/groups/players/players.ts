import { Elysia, t } from 'elysia';
import { PlayerUuid } from '../../common';
import { CreatePlayerDto } from './dto/create.dto';
import { UpdatePlayerDto } from './dto/update.dto';
import { PlayersService } from './service';

const commonParams = {
  params: t.Object({
    uuid: PlayerUuid,
  }),
};

export const players = new Elysia({ prefix: '/players' })
  .decorate({ playersService: new PlayersService() })
  .get('/', async ({ playersService }) => await playersService.getPlayers())
  .get(
    '/:uuid',
    async ({ playersService, params: { uuid }, set }) => {
      const player = await playersService.getPlayer(uuid, set);
      return JSON.stringify(player);
    },
    commonParams,
  )
  .get(
    'locale/:uuid',
    async ({ playersService, params: { uuid }, set }) => {
      await playersService.getLocale(uuid, set);
    },
    commonParams,
  )
  .post(
    '/',
    async ({ playersService, body }) => await playersService.createPlayer(body),
    {
      body: CreatePlayerDto,
    },
  )
  .post(
    'locale',
    async ({ playersService, body }) => await playersService.setLocale(body),
    {
      body: t.Object({
        uuid: PlayerUuid,
        locale: t.String(),
      }),
    },
  )
  .patch(
    '/:uuid',
    async ({ playersService, params: { uuid }, body }) =>
      await playersService.updatePlayer(uuid, body),
    {
      ...commonParams,
      body: UpdatePlayerDto,
    },
  )
  .delete(
    '/:uuid',
    async ({ playersService, params: { uuid } }) =>
      await playersService.deletePlayer(uuid),
    commonParams,
  );
