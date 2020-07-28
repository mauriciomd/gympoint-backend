import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import Student from '../infra/typeorm/entities/Student';

export default interface IStudentRepository {
  create(data: ICreateStudentDTO): Promise<Student>;
  findByEmail(email: string): Promise<Student | undefined>;
  findById(studentId: string): Promise<Student | undefined>;
  findAll(): Promise<Student[]>;
  delete(studentId: string): Promise<void>;
  update(student: Student): Promise<Student>;
}
