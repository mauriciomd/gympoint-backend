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

  public async findAllUnanswered(): Promise<HelpOrder[]> {
    return this.storedHelpOrders.filter(order => !order.answer);
  }

  public async update(order: HelpOrder): Promise<HelpOrder> {
    const orderIndex = this.storedHelpOrders.findIndex(
      storedOrder => storedOrder.id === order.id,
    );

    this.storedHelpOrders.splice(orderIndex, 1);
    this.storedHelpOrders.push(order);

    return order;
  }

  public async findById(orderId: string): Promise<HelpOrder | undefined> {
    return this.storedHelpOrders.find(order => order.id === orderId);
  }

  public async findAllByStudent(studentId: string): Promise<HelpOrder[]> {
    return this.storedHelpOrders.filter(order => order.studentId === studentId);
  }
}

export default FakeHelpOrderRepository;
