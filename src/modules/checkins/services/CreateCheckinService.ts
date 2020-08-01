import { injectable, inject } from 'tsyringe';

import { startOfDay, subDays } from 'date-fns';
import { ICreateCheckinDTO } from '../dtos/ICreateCheckinDTO';
import ICheckinRepository from '../repositories/ICheckinRepository';
import IStudentRepository from '../../students/repositories/IStudentRepository';
import Checkin from '../infra/typeorm/entities/Checkin';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

@injectable()
class CreateCheckinService {
  private checkinRepository: ICheckinRepository;

  private studentRepository: IStudentRepository;

  constructor(
    @inject('CheckinRepository')
    checkinRepository: ICheckinRepository,

    @inject('StudentRepository')
    studentRepository: IStudentRepository,
  ) {
    this.checkinRepository = checkinRepository;
    this.studentRepository = studentRepository;
  }

  public async execute({ studentId }: ICreateCheckinDTO): Promise<Checkin> {
    const MAX_CHECKINS_IN_SEVEN_DAYS = 5;
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new HttpRequestError('Invalid student id');
    }

    const today = startOfDay(new Date(Date.now()));
    const hasCheckin = await this.checkinRepository.findByDate(
      studentId,
      today,
    );
    if (hasCheckin) {
      throw new HttpRequestError('You already check-in today!');
    }

    const lastSevenDays = subDays(today, 7);
    const countCheckins = await this.checkinRepository.countChekinsBetween(
      studentId,
      lastSevenDays,
      today,
    );
    if (countCheckins >= MAX_CHECKINS_IN_SEVEN_DAYS) {
      throw new HttpRequestError(
        'You reached the check-ins limit in the weak!',
      );
    }

    const checkin = await this.checkinRepository.create({ studentId });
    return checkin;
  }
}

export default CreateCheckinService;
