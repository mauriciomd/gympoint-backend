import { ICreateEnrollment } from '../dtos/ICreateEnrollmentDTO';

export default interface IEnrollmentRepository {
  create(data: ICreateEnrollment): void;
}
