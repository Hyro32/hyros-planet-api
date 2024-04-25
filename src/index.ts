import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { players, sanctions } from './groups';

const app = new Elysia()
  .use(swagger())
  .get('/', () => 'Hello Elysia')
  .use(players)
  .use(sanctions)
  .onError(({ code }) => {
    if (code === 'NOT_FOUND') {
      return 'Route not found';
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
