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

  public async findById(studentId: string): Promise<Student | undefined> {
    return this.ormRepository.findOne({
      where: {
        id: studentId,
      },
    });
  }

  public async findAll(): Promise<Student[]> {
    return this.ormRepository.find();
  }

  public async delete(studentId: string): Promise<void> {
    await this.ormRepository.delete({ id: studentId });
  }
}

export default StudentRepository;
