import { Repository, getRepository } from 'typeorm';
import { startOfDay, endOfDay } from 'date-fns';

import { ICreateCheckinDTO } from '../../../dtos/ICreateCheckinDTO';
import ICheckinRepository from '../../../repositories/ICheckinRepository';
import Checkin from '../entities/Checkin';

class CheckinRepository implements ICheckinRepository {
  private ormRepository: Repository<Checkin>;

  constructor() {
    this.ormRepository = getRepository(Checkin);
  }

  public async create({ studentId }: ICreateCheckinDTO): Promise<Checkin> {
    const checkin = this.ormRepository.create({
      studentId,
    });

    await this.ormRepository.save(checkin);

    return checkin;
  }

  public async findByDate(
    studentId: string,
    date: Date,
  ): Promise<Checkin | undefined> {
    const checkin = await this.ormRepository
      .createQueryBuilder('checkins')
      .where(
        'checkins.createdAt > :start and checkins.createdAt < :end and checkins.studentId = :studentId',
        {
          studentId,
          start: startOfDay(date),
          end: endOfDay(date),
        },
      )
      .getOne();
    return checkin;
  }

  public async countChekinsBetween(
    studentId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    const checkins = await this.ormRepository
      .createQueryBuilder('checkins')
      .where(
        'checkins.createdAt > :start and checkins.createdAt < :end and checkins.studentId = :studentId',
        {
          studentId,
          start: startOfDay(startDate),
          end: endOfDay(endDate),
        },
      )
      .getCount();

    return checkins;
  }

  public async findAllByStudent(studentId: string): Promise<Checkin[]> {
    return this.ormRepository.find({
      where: {
        studentId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}

export default CheckinRepository;
