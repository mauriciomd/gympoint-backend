import { ICreateQuestionDTO } from '../dtos/ICreateQuestionDTO';
import HelpOrder from '../infra/typeorm/entities/HelpOrder';

export default interface IHelpOrderRepository {
  create(data: ICreateQuestionDTO): Promise<HelpOrder>;
  findAllUnanswered(): Promise<HelpOrder[]>;
  findById(orderId: string): Promise<HelpOrder | undefined>;
  update(order: HelpOrder): Promise<HelpOrder>;
  findAllByStudent(studentId: string): Promise<HelpOrder[]>;
}
