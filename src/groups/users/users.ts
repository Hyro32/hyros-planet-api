import { Elysia, t } from 'elysia';
import { UsersService } from './service';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

export const users = new Elysia({ prefix: 'users' })
  .decorate({ usersService: new UsersService() })
  .get('/', async ({ usersService }) => await usersService.getUsers())
  .get(
    '/:id',
    async ({ usersService, params: { id }, set }) =>
      await usersService.getUser(id, set),
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  )
  .post(
    '/',
    async ({ usersService, body }) => await usersService.createUser(body),
    {
      body: CreateUserDto,
    },
  )
  .patch(
    '/:id',
    async ({ usersService, body, params: { id } }) =>
      await usersService.updateUser(id, body),
    {
      body: UpdateUserDto,
      params: t.Object({
        id: t.String(),
      }),
    },
  )
  .delete(
    '/:id',
    async ({ usersService, params: { id } }) =>
      await usersService.deleteUser(id),
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  );
