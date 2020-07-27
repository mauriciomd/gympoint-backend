import { getRepository, Repository } from 'typeorm';
import { ICreateStudentDTO } from '../../../dtos/ICreateStudentDTO';
import IStudentRepository from '../../../repositories/IStudentRepository';
import Student from '../entities/Student';

class StudentRepository implements IStudentRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async create(data: ICreateStudentDTO): Promise<Student> {
    const student = this.ormRepository.create(data);

    await this.ormRepository.save(student);
    return student;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    return this.ormRepository.findOne({
      where: {
        email,
      },
    });
  }
}

export default StudentRepository;
