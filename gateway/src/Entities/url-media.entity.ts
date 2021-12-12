import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Url } from './url.entity';

@Entity()
export class UrlMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  src: string;

  @Column()
  type: string;

  @ManyToOne(() => Url, (url) => url.urlMedia)
  url: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
