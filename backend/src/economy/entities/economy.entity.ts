import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Economy {
  @PrimaryColumn()
  uuid: string;

  @Column({ default: 0 })
  purse: number;

  @Column({ default: 10000 })
  bank: number;
}
