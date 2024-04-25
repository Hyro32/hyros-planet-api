import { createClient } from 'redis';

const client = createClient({
  username: import.meta.env.REDIS_USERNAME,
  password: import.meta.env.REDIS_PASSWORD,
  socket: {
    port: import.meta.env.REDIS_PORT as unknown as number,
    host: import.meta.env.REDIS_HOST,
  },
});

client.on('error', (err) => console.log('Redis Client Error', err));
(async () => {
  await client.connect();
  console.log('Connected to Redis');
})();

export async function setValue(key: string, value: unknown) {
  return await client.set(key, JSON.stringify(value));
}

export async function getValue(key: string) {
  const value: unknown = await client.get(key);
  return JSON.parse(value as string);
}

export async function deleteValue(key: string) {
  return await client.del(key);
}

export async function deleteAllValues() {
  await client.flushAll();
}
