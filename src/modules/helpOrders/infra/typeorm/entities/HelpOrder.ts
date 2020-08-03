import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Student from '../../../../students/infra/typeorm/entities/Student';

@Entity('helporders')
class HelpOrder {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  studentId!: string;

  @ManyToOne(() => Student, student => student.id, { eager: true })
  @JoinColumn({ name: 'studentId', referencedColumnName: 'id' })
  student!: Student;

  @Column()
  question!: string;

  @Column()
  answer!: string;

  @Column()
  answeredAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default HelpOrder;
