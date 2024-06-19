import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ban {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  operator: string;

  @Column()
  reason: string;

  @Column({ nullable: true })
  expires: Date;
}
