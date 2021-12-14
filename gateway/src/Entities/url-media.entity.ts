import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Url } from './url.entity';

@Entity('url_media')
export class UrlMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  src: string;

  @Column()
  type: string;

  @ManyToOne(() => Url, (url) => url.urlMedia)
  @JoinColumn({ name: 'url_id' })
  url: Url;

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
