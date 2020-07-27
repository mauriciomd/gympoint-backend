import { injectable, inject } from 'tsyringe';

import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';

@injectable()
class CreateStudentService {
  private studentRepository: IStudentRepository;

  constructor(
    @inject('StudentRepository')
    studentRepository: IStudentRepository,
  ) {
    this.studentRepository = studentRepository;
  }

  public async execute(data: ICreateStudentDTO): Promise<Student> {
    const student = this.studentRepository.create(data);

    return student;
  }
}

export default CreateStudentService;
