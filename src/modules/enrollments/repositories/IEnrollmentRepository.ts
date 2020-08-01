import { ISaveEnrollment } from '../dtos/ISaveEnrollmentDTO';
import Enrollment from '../infra/typeorm/entities/Enrollment';

export default interface IEnrollmentRepository {
  create(data: ISaveEnrollment): Promise<Enrollment>;
  findAll(): Promise<Enrollment[]>;
  findById(enrollmentId: string): Promise<Enrollment | undefined>;
  delete(enrollment: Enrollment): Promise<void>;
}
