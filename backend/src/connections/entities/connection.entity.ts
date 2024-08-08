import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Connection {
  @PrimaryColumn()
  uuid: string;

  @Column({ default: null })
  discord: string;
}
