import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CacheModule,
  CacheModuleAsyncOptions,
  CacheStore,
} from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { CachingModule } from './caching/caching.module';
import { PlayersModule } from './players/players.module';
import { EconomyModule } from './economy/economy.module';
import { ConnectionsModule } from './connections/connections.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_USERNAME: Joi.string().required(),
        REDIS_PASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configuration: ConfigService) => ({
        type: 'postgres',
        host: configuration.get<string>('DB_HOST'),
        port: +configuration.get<number>('DB_PORT'),
        username: configuration.get<string>('DB_USERNAME'),
        password: configuration.get<string>('DB_PASSWORD'),
        database: configuration.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    CacheModule.registerAsync<CacheModuleAsyncOptions>({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configuration: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configuration.get('REDIS_HOST'),
            port: +configuration.get('REDIS_PORT'),
          },
          username: configuration.get('REDIS_USERNAME'),
          password: configuration.get('REDIS_PASSWORD'),
        });
        return {
          store: store as unknown as CacheStore,
        };
      },
      isGlobal: true,
    }),
    CachingModule,
    PlayersModule,
    EconomyModule,
    ConnectionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
