import { getRepository, Repository } from 'typeorm';

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

    await this.ormRepository.save(order);
    return order;
  }

  public async findAll(): Promise<HelpOrder[]> {
    return this.ormRepository.find();
  }
}

export default HelpOrderRepository;
