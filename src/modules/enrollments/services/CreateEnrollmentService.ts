import { injectable, inject } from 'tsyringe';
import { isBefore, isToday, startOfDay, addMonths } from 'date-fns';

import { ICreateEnrollment } from '../dtos/ICreateEnrollmentDTO';
import Enrollment from '../infra/typeorm/entities/Enrollment';
import IEnrollmentRepository from '../repositories/IEnrollmentRepository';
import IStudentRepository from '../../students/repositories/IStudentRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';
import IMembershipRepository from '../../memberships/repositories/IMembershipRepository';

@injectable()
class CreateEnrollmentServie {
  private enrollmentRepository: IEnrollmentRepository;

  private studentRepository: IStudentRepository;

  private membershipRepository: IMembershipRepository;

  constructor(
    @inject('EnrollmentRepository')
    enrollmentRepository: IEnrollmentRepository,

    @inject('StudentRepository')
    studentRepository: IStudentRepository,

    @inject('MembershipRepository')
    membershipRepository: IMembershipRepository,
  ) {
    this.enrollmentRepository = enrollmentRepository;
    this.studentRepository = studentRepository;
    this.membershipRepository = membershipRepository;
  }

  public async execute({
    membershipId,
    studentId,
    startDate,
  }: ICreateEnrollment): Promise<Enrollment> {
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new HttpRequestError('Invalid student ID');
    }

    const membership = await this.membershipRepository.findById(membershipId);
    if (!membership) {
      throw new HttpRequestError('Invalid membership ID');
    }

    const isValidDate = isBefore(startOfDay(Date.now()), startOfDay(startDate));
    if (!isValidDate && !isToday(startDate)) {
      throw new HttpRequestError('Invalid start date');
    }

    const endDate = addMonths(startDate, membership.duration);
    const total = membership.duration * membership.price;

    const enrollment = await this.enrollmentRepository.create({
      startDate,
      studentId,
      membershipId,
      endDate,
      total,
    });

    return enrollment;
  }
}

export default CreateEnrollmentServie;
