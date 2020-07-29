import { ICreateEnrollment } from '../../../dtos/ICreateEnrollmentDTO';
import IEnrollmentRepository from '../../../repositories/IEnrollmentRepository';
import Enrollment from '../entities/Enrollment';

class EnrollmentRepository implements IEnrollmentRepository {
  public async create({ }: ICreateEnrollment): Promise<Enrollment> { }
}

export default EnrollmentRepository;
