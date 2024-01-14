import BaseEntity from '@shared/base/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'categories',
})
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column({ nullable: false, length: 255 })
  description: string;
}
