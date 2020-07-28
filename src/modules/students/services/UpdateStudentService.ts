import { injectable, inject } from 'tsyringe';

import { IUpdateStudentDTO } from '../dtos/IUpdateStudentDTO';
import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

@injectable()
class UpdateStudentService {
  private studentRepository: IStudentRepository;

  constructor(
    @inject('StudentRepository')
    studentRepository: IStudentRepository,
  ) {
    this.studentRepository = studentRepository;
  }

  public async execute({
    id,
    name,
    email,
    age,
    height,
    weight,
  }: IUpdateStudentDTO): Promise<Student> {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new HttpRequestError('Invalid student id');
    }

    if (email) {
      const isAlreadyUsed = await this.studentRepository.findByEmail(email);
      if (isAlreadyUsed) {
        throw new HttpRequestError('This e-mail is already used');
      }
    }

    const updatedStudent = Object.assign(student, {
      name: name || student.name,
      email: email || student.email,
      age: age || student.age,
      height: height || student.height,
      weight: weight || student.weight,
    });

    await this.studentRepository.update(updatedStudent);
    return updatedStudent;
  }
}

export default UpdateStudentService;
