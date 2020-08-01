import { ICreateCheckinDTO } from '../dtos/ICreateCheckinDTO';
import Checkin from '../infra/typeorm/entities/Checkin';

export default interface ICheckinRepository {
  create(data: ICreateCheckinDTO): Promise<Checkin>;
  findByDate(studentId: string, date: Date): Promise<Checkin | undefined>;
  countChekinsBetween(
    studentId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number>;
}
