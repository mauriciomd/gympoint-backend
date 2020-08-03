import { injectable, inject } from 'tsyringe';

import { ICreateAnswerDTO } from '../dtos/ICreateAnswerDTO';
import IHelpOrderRepository from '../repositories/IHelpOrderRepository';
import HelpOrder from '../infra/typeorm/entities/HelpOrder';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

@injectable()
class CreateAnswerService {
  private helpOrderRepository: IHelpOrderRepository;

  constructor(
    @inject('HelpOrderRepository')
    helpOrderRepository: IHelpOrderRepository,
  ) {
    this.helpOrderRepository = helpOrderRepository;
  }

  public async execute({
    orderId,
    answer,
  }: ICreateAnswerDTO): Promise<HelpOrder> {
    const order = await this.helpOrderRepository.findById(orderId);
    if (!order) {
      throw new HttpRequestError('Invalid help order id');
    }

    order.answer = answer;
    order.answeredAt = new Date();

    const updatedOrder = this.helpOrderRepository.update(order);
    return updatedOrder;
  }
}

export default CreateAnswerService;
