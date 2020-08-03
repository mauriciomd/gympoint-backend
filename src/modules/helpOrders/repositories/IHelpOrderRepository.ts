import { ICreateQuestionDTO } from '../dtos/ICreateQuestionDTO';
import HelpOrder from '../infra/typeorm/entities/HelpOrder';

export default interface IHelpOrderRepository {
  create(data: ICreateQuestionDTO): Promise<HelpOrder>;
  findAll(): Promise<HelpOrder[]>;
}
