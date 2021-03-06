import { uuid } from 'uuidv4';

import { ICreateStudentDTO } from '../../dtos/ICreateStudentDTO';
import IStudentRepository from '../IStudentRepository';
import Student from '../../infra/typeorm/entities/Student';

class FakeStudentRepository implements IStudentRepository {
  private storedStudents: Student[] = [];

  public async create(data: ICreateStudentDTO): Promise<Student> {
    const student = new Student();
    Object.assign(student, {
      id: uuid(),
      ...data,
    });

    this.storedStudents.push(student);
    return student;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    return this.storedStudents.find(student => student.email === email);
  }

  public async findById(studentId: string): Promise<Student | undefined> {
    return this.storedStudents.find(student => student.id === studentId);
  }

  public async findAll(): Promise<Student[]> {
    return [...this.storedStudents];
  }

  public async delete(studentId: string): Promise<void> {
    this.storedStudents = this.storedStudents.filter(
      student => student.id !== studentId,
    );
  }

  public async update(student: Student): Promise<Student> {
    const storedStudentIndex = this.storedStudents.findIndex(
      storedStudent => storedStudent.id === student.id,
    );

    this.storedStudents.splice(storedStudentIndex, 1);
    this.storedStudents.push(student);

    return student;
  }
}

export default FakeStudentRepository;
