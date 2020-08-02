import { uuid } from 'uuidv4';
import { startOfDay, isEqual, isAfter, isBefore } from 'date-fns';

import ICheckinRepository from '../ICheckinRepository';
import { ICreateCheckinDTO } from '../../dtos/ICreateCheckinDTO';
import Checkin from '../../infra/typeorm/entities/Checkin';

class FakeCheckinRepository implements ICheckinRepository {
  private storedCheckins: Checkin[] = [];

  public async create({ studentId }: ICreateCheckinDTO): Promise<Checkin> {
    const checkin = new Checkin();
    const date = new Date(Date.now());

    Object.assign(checkin, {
      id: uuid(),
      studentId,
      createdAt: date,
      updatedAt: date,
    });

    this.storedCheckins.push(checkin);
    return checkin;
  }

  public async findByDate(
    studentId: string,
    date: Date,
  ): Promise<Checkin | undefined> {
    return this.storedCheckins.find(checkin => {
      const checkinDate = startOfDay(checkin.createdAt);

      return isEqual(date, checkinDate) && checkin.studentId === studentId;
    });
  }

  public async countChekinsBetween(
    studentId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    const parsedStartDate = startOfDay(startDate);
    const parsedEndDate = startOfDay(endDate);

    const count = this.storedCheckins.reduce((total, checkin) => {
      const checkinDate = startOfDay(checkin.createdAt);

      if (
        (isAfter(checkinDate, parsedStartDate) ||
          isEqual(checkinDate, parsedStartDate)) &&
        (isBefore(checkinDate, parsedEndDate) ||
          isEqual(checkinDate, parsedEndDate)) &&
        checkin.studentId === studentId
      ) {
        return total + 1;
      }

      return total;
    }, 0);

    return count;
  }

  public async findAllByStudent(studentId: string): Promise<Checkin[]> {
    return this.storedCheckins.filter(
      checkin => checkin.studentId === studentId,
    );
  }
}

export default FakeCheckinRepository;
