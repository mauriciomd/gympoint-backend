import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Membership from '../../../../memberships/infra/typeorm/entities/Membership';
import Student from '../../../../students/infra/typeorm/entities/Student';

@Entity('enrollments')
class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  membershipId!: string;

  @ManyToOne(() => Membership)
  @JoinColumn({ name: 'membershipId' })
  membership!: Membership;

  @Column()
  studentId!: string;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'studentId' })
  student!: Student;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  total!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default Enrollment;
