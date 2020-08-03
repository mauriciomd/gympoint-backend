import { uuid } from 'uuidv4';

import { ICreateQuestionDTO } from '../../dtos/ICreateQuestionDTO';
import IHelpOrderRepository from '../IHelpOrderRepository';
import HelpOrder from '../../infra/typeorm/entities/HelpOrder';

class FakeHelpOrderRepository implements IHelpOrderRepository {
  private storedHelpOrders: HelpOrder[] = [];

  public async create({
    studentId,
    question,
  }: ICreateQuestionDTO): Promise<HelpOrder> {
    const order = new HelpOrder();

    Object.assign(order, {
      id: uuid(),
      studentId,
      question,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.storedHelpOrders.push(order);
    return order;
  }
}

export default FakeHelpOrderRepository;
