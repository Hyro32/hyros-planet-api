import { Elysia, t } from 'elysia';
import { PlayerUuid } from '../../common';
import { CreatePlayerDto } from './dto/create.dto';
import { UpdatePlayerDto } from './dto/update.dto';
import { PlayersService } from './service';

export const players = new Elysia({ prefix: '/players' })
  .decorate({ Service: new PlayersService() })
  .get('/', async ({ Service }) => await Service.getPlayers())
  .get(
    '/:uuid',
    async ({ Service, params: { uuid } }) => await Service.getPlayer(uuid),
    {
      params: t.Object({
        uuid: PlayerUuid,
      }),
    },
  )
  .get(
    'locale/:uuid',
    async ({ Service, params: { uuid } }) => Service.getLocale(uuid),
    {
      params: t.Object({
        uuid: PlayerUuid,
      }),
    },
  )
  .post('/', async ({ Service, body }) => await Service.createPlayer(body), {
    body: CreatePlayerDto,
  })
  .post('locale', async ({ Service, body }) => await Service.setLocale(body), {
    body: t.Object({
      uuid: PlayerUuid,
      locale: t.String(),
    }),
  })
  .patch(
    '/:uuid',
    async ({ Service, params: { uuid }, body }) =>
      await Service.updatePlayer(uuid, body),
    {
      params: t.Object({
        uuid: PlayerUuid,
      }),
      body: UpdatePlayerDto,
    },
  )
  .delete(
    '/:uuid',
    async ({ Service, params: { uuid } }) => await Service.deletePlayer(uuid),
    {
      params: t.Object({
        uuid: PlayerUuid,
      }),
    },
  );
