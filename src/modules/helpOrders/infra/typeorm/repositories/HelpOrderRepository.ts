import { getRepository, Repository, IsNull } from 'typeorm';

import { ICreateQuestionDTO } from '../../../dtos/ICreateQuestionDTO';
import IHelpOrderRepository from '../../../repositories/IHelpOrderRepository';
import HelpOrder from '../entities/HelpOrder';

class HelpOrderRepository implements IHelpOrderRepository {
  private ormRepository: Repository<HelpOrder>;

  constructor() {
    this.ormRepository = getRepository(HelpOrder);
  }

  public async create({
    studentId,
    question,
  }: ICreateQuestionDTO): Promise<HelpOrder> {
    const order = this.ormRepository.create({
      studentId,
      question,
    });

    return this.ormRepository.save(order);
  }

  public async findAllUnanswered(): Promise<HelpOrder[]> {
    return this.ormRepository.find({
      where: {
        answer: IsNull(),
      },
    });
  }

  public async update(order: HelpOrder): Promise<HelpOrder> {
    return this.ormRepository.save(order);
  }

  public async findById(orderId: string): Promise<HelpOrder | undefined> {
    return this.ormRepository.findOne({
      where: {
        id: orderId,
      },
    });
  }

  public async findAllByStudent(studentId: string): Promise<HelpOrder[]> {
    return this.ormRepository.find({
      where: {
        studentId,
      },
    });
  }
}

export default HelpOrderRepository;
