import { Exclude } from 'class-transformer';
import BaseEntity from 'src/shared/base/entity/base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sso', nullable: false, length: 20 })
  sso: string;
  @Column({ name: 'name', nullable: false, length: 255 })
  name: string;

  @Column({ name: 'job_name', nullable: false, length: 255 })
  jobName: string;

  @Column({ name: 'email' })
  email: string;

  @Exclude()
  @Column({ name: 'password' })
  password: string;

  @Column({
    nullable: true,
    name: 'created_by',
  })
  createdBy: number;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy?: number;

  @Exclude()
  @Column({
    name: 'is_deleted',
    default: false,
  })
  isDeleted?: boolean;

  // @ManyToMany(
  //   () => Material,
  //   material => material.users,
  // )
  // materials: Material[];

  // @OneToMany(() => UserShift, (userShift: UserShift) => userShift.user)
  // userShift: UserShift[];

  // @OneToOne(() => UserProfile)
  // @JoinColumn({ name: 'id' })
  // userProfile: UserProfile;

  // @ManyToMany(() => Role, (role) => role.users)
  // @JoinTable({ name: 'tbl_user_role', joinColumns: [{ name: 'user_id' }], inverseJoinColumns: [{ name: 'role_id' }] })
  // roles: Role[];
}
