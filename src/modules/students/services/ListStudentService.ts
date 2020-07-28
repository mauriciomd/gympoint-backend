import { injectable, inject } from 'tsyringe';

import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';

@injectable()
class ListStudentService {
  private studentRepository: IStudentRepository;

  constructor(
    @inject('StudentRepository')
    studentRepository: IStudentRepository,
  ) {
    this.studentRepository = studentRepository;
  }

  public async execute(): Promise<Student[]> {
    const students = await this.studentRepository.findAll();

    return students;
  }
}

export default ListStudentService;
