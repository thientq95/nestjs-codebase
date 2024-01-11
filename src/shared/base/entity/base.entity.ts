import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
  })
  deletedAt: Date;

  @Column({
    nullable: true,
    name: 'created_by',
  })
  createdBy: number;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy?: number;

  @Column({
    name: 'is_deleted',
    default: false,
  })
  isDeleted?: boolean;
}
