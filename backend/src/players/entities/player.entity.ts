import { Ranks } from 'src/common/types';
import { Connection } from 'src/connections/entities/connection.entity';
import { Economy } from 'src/economy/entities/economy.entity';
import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Player {
  @PrimaryColumn()
  uuid: string;

  @Column({ default: Ranks.DEFAULT })
  rank: string;

  @Column({ default: null, nullable: true })
  rank_expiration: Date;

  @Column({ default: new Date() })
  first_joined: Date;

  @Column({ default: null, nullable: true })
  last_joined: Date;

  @ManyToMany(() => Player)
  friends: Player[];

  @OneToOne(() => Connection)
  @JoinColumn()
  connections: Connection;

  @OneToOne(() => Economy)
  @JoinColumn()
  economy: Economy;
}
