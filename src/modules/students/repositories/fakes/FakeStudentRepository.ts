import { ICreateStudentDTO } from '../../dtos/ICreateStudentDTO';
import IStudentRepository from '../IStudentRepository';
import Student from '../../infra/typeorm/entities/Student';

class FakeUserRepository implements IStudentRepository {
  private storedStudents: Student[] = [];

  public async create(data: ICreateStudentDTO): Promise<Student> {
    const student = new Student();
    Object.assign(student, data);

    this.storedStudents.push(student);
    return student;
  }
}

export default FakeUserRepository;
