import { Elysia, t } from 'elysia';
import { CreateSanctionDto } from './dto/create.dto';
import { SanctionsService } from './service';

const commonParams = {
  params: t.Object({
    id: t.Number(),
  }),
};

export const sanctions = new Elysia({ prefix: 'sanctions' })
  .decorate({ sanctionsService: new SanctionsService() })
  .get(
    '/',
    async ({ sanctionsService }) => await sanctionsService.getSanctions(),
  )
  .get(
    '/:id',
    async ({ sanctionsService, params: { id } }) =>
      await sanctionsService.getSanction(id),
    commonParams,
  )
  .post(
    '/',
    async ({ sanctionsService, body }) =>
      await sanctionsService.createSanction(body),
    {
      body: CreateSanctionDto,
    },
  )
  .delete(
    '/:id',
    async ({ sanctionsService, params: { id } }) =>
      await sanctionsService.deleteSanction(id),
    commonParams,
  );
