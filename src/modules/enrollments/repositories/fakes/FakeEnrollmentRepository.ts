import { uuid } from 'uuidv4';

import { ISaveEnrollment } from '../../dtos/ISaveEnrollmentDTO';
import IEnrollmentRepository from '../IEnrollmentRepository';
import Enrollment from '../../infra/typeorm/entities/Enrollment';

class EnrollmentRepository implements IEnrollmentRepository {
  private storedEnrollments: Enrollment[] = [];

  public async create({
    studentId,
    membershipId,
    startDate,
    endDate,
    total,
  }: ISaveEnrollment): Promise<Enrollment> {
    const enrollment = new Enrollment();
    Object.assign(enrollment, {
      id: uuid(),
      studentId,
      membershipId,
      startDate,
      endDate,
      total,
    });

    this.storedEnrollments.push(enrollment);
    return enrollment;
  }
}

export default EnrollmentRepository;
