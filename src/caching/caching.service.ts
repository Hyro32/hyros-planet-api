import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService implements OnApplicationBootstrap {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async getKey(key: string): Promise<unknown> {
    try {
      return await this.cache.get(key);
    } catch (error) {
      return null;
    }
  }

  async setKey(key: string, value: unknown): Promise<void> {
    try {
      await this.cache.set(key, value);
    } catch (error) {
      console.error(error);
    }
  }

  async setKeyWithTTL(key: string, value: unknown, ttl: number): Promise<void> {
    try {
      await this.cache.set(key, value, ttl);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteKey(key: string): Promise<void> {
    try {
      await this.cache.del(key);
    } catch (error) {
      console.error(error);
    }
  }

  async reset(): Promise<void> {
    try {
      await this.cache.reset();
    } catch (error) {
      console.error(error);
    }
  }

  async onApplicationBootstrap(): Promise<void> {
    // Reset the cache on application start
    await this.reset();
  }
}
