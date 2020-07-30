import { injectable, inject } from 'tsyringe';
import { isBefore, startOfDay } from 'date-fns';

import Enrollment from '../infra/typeorm/entities/Enrollment';
import IEnrollmentRepository from '../repositories/IEnrollmentRepository';

type EnrollmentStatus = Enrollment & {
  isActive: boolean;
};

@injectable()
class CreateEnrollmentServie {
  private enrollmentRepository: IEnrollmentRepository;

  constructor(
    @inject('EnrollmentRepository')
    enrollmentRepository: IEnrollmentRepository,
  ) {
    this.enrollmentRepository = enrollmentRepository;
  }

  public async execute(): Promise<EnrollmentStatus[]> {
    const enrollments = await this.enrollmentRepository.findAll();
    const today = startOfDay(new Date());

    const enrollmentsStatus: EnrollmentStatus[] = enrollments.map(
      enrollment => ({
        ...enrollment,
        isActive: isBefore(today, enrollment.endDate),
      }),
    );

    return enrollmentsStatus;
  }
}

export default CreateEnrollmentServie;
