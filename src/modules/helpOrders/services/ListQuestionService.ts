import { injectable, inject } from 'tsyringe';

import IHelpOrderRepository from '../repositories/IHelpOrderRepository';
import HelpOrder from '../infra/typeorm/entities/HelpOrder';

@injectable()
class CreateQuestionService {
  private helpOrderRepository: IHelpOrderRepository;

  constructor(
    @inject('HelpOrderRepository')
    helpOrderRepository: IHelpOrderRepository,
  ) {
    this.helpOrderRepository = helpOrderRepository;
  }

  public async execute(): Promise<HelpOrder[]> {
    const orders = await this.helpOrderRepository.findAll();
    return orders;
  }
}

export default CreateQuestionService;
