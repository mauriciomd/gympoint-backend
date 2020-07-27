import { injectable, inject } from 'tsyringe';

import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

@injectable()
class CreateStudentService {
  private studentRepository: IStudentRepository;

  constructor(
    @inject('StudentRepository')
    studentRepository: IStudentRepository,
  ) {
    this.studentRepository = studentRepository;
  }

  public async execute({
    name,
    email,
    age,
    height,
    weight,
  }: ICreateStudentDTO): Promise<Student> {
    const isEmailUsed = await this.studentRepository.findByEmail(email);
    if (isEmailUsed) {
      throw new HttpRequestError('This e-mail is already used!');
    }

    const student = await this.studentRepository.create({
      name,
      email,
      age,
      height,
      weight,
    });

    return student;
  }
}

export default CreateStudentService;
