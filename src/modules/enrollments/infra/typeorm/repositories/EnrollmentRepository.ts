import { Repository, getRepository } from 'typeorm';

import { ISaveEnrollment } from '../../../dtos/ISaveEnrollmentDTO';
import IEnrollmentRepository from '../../../repositories/IEnrollmentRepository';
import Enrollment from '../entities/Enrollment';

class EnrollmentRepository implements IEnrollmentRepository {
  private ormRepository: Repository<Enrollment>;

  constructor() {
    this.ormRepository = getRepository(Enrollment);
  }

  public async create({
    studentId,
    membershipId,
    startDate,
    endDate,
    total,
  }: ISaveEnrollment): Promise<Enrollment> {
    const enrollment = this.ormRepository.create({
      membershipId,
      studentId,
      startDate,
      endDate,
      total,
    });

    await this.ormRepository.save(enrollment);
    return enrollment;
  }
}

export default EnrollmentRepository;
