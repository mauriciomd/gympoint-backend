import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Student from '../../../../students/infra/typeorm/entities/Student';

@Entity('checkins')
class Checkin {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  studentId!: string;

  @ManyToOne(() => Student, student => student.id, { eager: true })
  @JoinColumn({ name: 'studentId', referencedColumnName: 'id' })
  student!: Student;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default Checkin;
