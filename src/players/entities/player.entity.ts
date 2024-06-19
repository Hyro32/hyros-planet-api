import { Ranks } from 'src/common';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryColumn()
  uuid: string;

  @Column({ default: Ranks.DEFAULT })
  rank: string;

  @Column({ default: null, nullable: true })
  rank_expiration: Date;

  @Column({ default: 0 })
  level: number;

  @Column({ default: new Date() })
  first_joined: Date;

  @Column({ default: null, nullable: true })
  last_joined: Date;

  @ManyToMany(() => Player, (player) => player.uuid)
  friends: Player[];
}
