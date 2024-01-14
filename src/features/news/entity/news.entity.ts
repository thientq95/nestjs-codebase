import BaseEntity from '@shared/base/entity/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'news',
})
export class News extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  content: string;

  @Column({})
  published: boolean = false;

  @Column({
    type: Date,
    nullable: true,
  })
  publish_at: Date | null;
}
