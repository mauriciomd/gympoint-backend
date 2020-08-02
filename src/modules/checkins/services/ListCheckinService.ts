import { injectable, inject } from 'tsyringe';

import Checkin from '../infra/typeorm/entities/Checkin';
import ICheckinRepository from '../repositories/ICheckinRepository';
import IStudentRepository from '../../students/repositories/IStudentRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

@injectable()
class ListCheckinService {
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

  public async execute(studentId: string): Promise<Checkin[]> {
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new HttpRequestError('Invalid student id');
    }

    const checkins = await this.checkinRepository.findAllByStudent(studentId);

    return checkins;
  }
}

export default ListCheckinService;
