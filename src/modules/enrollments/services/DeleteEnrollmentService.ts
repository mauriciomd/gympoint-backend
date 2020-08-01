import { injectable, inject } from 'tsyringe';

import IEnrollmentRepository from '../repositories/IEnrollmentRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

@injectable()
class DeleteEnrollmentServie {
  private enrollmentRepository: IEnrollmentRepository;

  constructor(
    @inject('EnrollmentRepository')
    enrollmentRepository: IEnrollmentRepository,
  ) {
    this.enrollmentRepository = enrollmentRepository;
  }

  public async execute(enrollmentId: string): Promise<void> {
    const enrollment = await this.enrollmentRepository.findById(enrollmentId);
    if (!enrollment) {
      throw new HttpRequestError('Invalid enrollment id');
    }

    await this.enrollmentRepository.delete(enrollment);
  }
}

export default DeleteEnrollmentServie;
