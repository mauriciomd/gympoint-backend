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

  public async findAll(): Promise<Enrollment[]> {
    return this.ormRepository.find();
  }

  public async findById(enrollmentId: string): Promise<Enrollment | undefined> {
    return this.ormRepository.findOne({
      where: {
        id: enrollmentId,
      },
    });
  }

  public async delete(enrollment: Enrollment): Promise<void> {
    await this.ormRepository.delete({ id: enrollment.id });
  }
}

export default EnrollmentRepository;
