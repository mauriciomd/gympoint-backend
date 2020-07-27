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
}

export default FakeStudentRepository;
