import { Elysia, t } from 'elysia';
import { CreateSanctionDto } from './dto/create.dto';
import { SanctionsService } from './service';

export const sanctions = new Elysia({ prefix: 'sanctions' })
  .decorate({ Service: new SanctionsService() })
  .get('/', async ({ Service }) => await Service.getSanctions())
  .get(
    '/:id',
    async ({ Service, params: { id } }) => await Service.getSanction(id),
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .post('/', async ({ Service, body }) => await Service.createSanction(body), {
    body: CreateSanctionDto,
  })
  .delete(
    '/:id',
    async ({ Service, params: { id } }) => await Service.deleteSanction(id),
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  );
