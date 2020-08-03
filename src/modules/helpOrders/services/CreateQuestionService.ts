import { injectable, inject } from 'tsyringe';

import { ICreateQuestionDTO } from '../dtos/ICreateQuestionDTO';
import IHelpOrderRepository from '../repositories/IHelpOrderRepository';
import IStudentRepository from '../../students/repositories/IStudentRepository';
import HelpOrder from '../infra/typeorm/entities/HelpOrder';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

@injectable()
class CreateQuestionService {
  private helpOrderRepository: IHelpOrderRepository;

  private studentRepository: IStudentRepository;

  constructor(
    @inject('HelpOrderRepository')
    helpOrderRepository: IHelpOrderRepository,

    @inject('StudentRepository')
    studentRepository: IStudentRepository,
  ) {
    this.helpOrderRepository = helpOrderRepository;
    this.studentRepository = studentRepository;
  }

  public async execute({
    studentId,
    question,
  }: ICreateQuestionDTO): Promise<HelpOrder> {
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new HttpRequestError('Invalid student id');
    }

    const order = await this.helpOrderRepository.create({
      studentId,
      question,
    });

    return order;
  }
}

export default CreateQuestionService;
