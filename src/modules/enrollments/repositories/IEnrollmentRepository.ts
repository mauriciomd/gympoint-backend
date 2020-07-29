import { ISaveEnrollment } from '../dtos/ISaveEnrollmentDTO';
import Enrollment from '../infra/typeorm/entities/Enrollment';

export default interface IEnrollmentRepository {
  create(data: ISaveEnrollment): Promise<Enrollment>;
}
