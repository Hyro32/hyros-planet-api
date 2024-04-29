import { Elysia, t } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { AuthService } from './service';
import { CreateUserDto } from '../users/dto/create.dto';
import { UsersService } from '../users/service';

export const auth = new Elysia({ prefix: 'auth' })
  .decorate({ authService: new AuthService(new UsersService()) })
  .use(
    jwt({
      name: 'authJwt',
      secret: import.meta.env.JWT_SECRET as string,
    }),
  )
  .get('/logout', async ({ authService, cookie: { auth } }) =>
    authService.logout(auth),
  )
  .get(
    '/profile',
    async ({ authService, authJwt, cookie: { auth }, set }) =>
      await authService.profile(authJwt, auth, set),
  )
  .post(
    '/login',
    async ({ authService, authJwt, cookie: { auth }, body, set }) =>
      authService.login(authJwt, auth, body, set),
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
  )
  .post(
    '/register',
    async ({ authService, body }) => authService.register(body),
    {
      body: CreateUserDto,
    },
  )
  .post(
    '/reset-password',
    async ({ authService, body, set }) =>
      authService.resetPassword(body.email, set),
    {
      body: t.Object({
        email: t.String(),
      }),
    },
  );
