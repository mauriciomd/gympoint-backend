import { injectable, inject } from 'tsyringe';

import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

@injectable()
class ListStudentService {
  private studentRepository: IStudentRepository;

  constructor(
    @inject('StudentRepository')
    studentRepository: IStudentRepository,
  ) {
    this.studentRepository = studentRepository;
  }

  public async execute(studentId: string): Promise<Student> {
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new HttpRequestError('Invalid student id');
    }

    return student;
  }
}

export default ListStudentService;
