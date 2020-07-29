import 'reflect-metadata';

import CreateEnrollmentService from '../services/CreateEnrollmentService';
import FakeEnrollmentRepository from '../repositories/fakes/FakeEnrollmentRepository';
import FakeStudentRepository from '../../students/repositories/fakes/FakeStudentRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';
import FakeMembershipRepository from '../../memberships/repositories/fakes/FakeMembershipRepository';

let sut: CreateEnrollmentService;
let fakeEnrollmentRepository: FakeEnrollmentRepository;
let fakeStudentRepository: FakeStudentRepository;
let fakeMembershipRepository: FakeMembershipRepository;
describe('Unit test: CreateEnrollment', () => {
  beforeEach(() => {
    fakeEnrollmentRepository = new FakeEnrollmentRepository();
    fakeStudentRepository = new FakeStudentRepository();
    fakeMembershipRepository = new FakeMembershipRepository();
    sut = new CreateEnrollmentService(
      fakeEnrollmentRepository,
      fakeStudentRepository,
      fakeMembershipRepository,
    );
  });

  it('should be called with correct params', async () => {
    const executeMethod = jest.spyOn(sut, 'execute');
    const currentDate = new Date(2020, 3, 15);
    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    const membership = await fakeMembershipRepository.create({
      title: 'Valid title',
      duration: 12,
      price: 119,
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 3, 12).getTime();
    });

    await sut.execute({
      membershipId: membership.id,
      studentId: student.id,
      startDate: currentDate,
    });

    expect(executeMethod).toBeCalledWith({
      membershipId: membership.id,
      studentId: student.id,
      startDate: currentDate,
    });
  });

  it('should not be able to create an enrollment without a valid student ID', async () => {
    const membership = await fakeMembershipRepository.create({
      title: 'Valid title',
      duration: 12,
      price: 119,
    });

    await expect(
      sut.execute({
        membershipId: membership.id,
        studentId: 'invalid-student-id',
        startDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });

  it('should not be able to create an enrollment without a valid membership ID', async () => {
    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    await expect(
      sut.execute({
        membershipId: 'invalid-membership-id',
        studentId: student.id,
        startDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });

  it('should not be able to create an enrollment in the past', async () => {
    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    const membership = await fakeMembershipRepository.create({
      title: 'Valid title',
      duration: 12,
      price: 119,
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 3, 12).getTime();
    });

    await expect(
      sut.execute({
        membershipId: membership.id,
        studentId: student.id,
        startDate: new Date(2020, 3, 10),
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });

  it('should be able to create a new enrollment', async () => {
    const membershipPrice = 119;
    const membershipDuration = 12;

    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    const membership = await fakeMembershipRepository.create({
      title: 'Valid title',
      duration: membershipDuration,
      price: membershipPrice,
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 3, 12).getTime();
    });

    const enrollment = await sut.execute({
      membershipId: membership.id,
      studentId: student.id,
      startDate: new Date(2020, 3, 15),
    });

    const total = membershipPrice * membershipDuration;
    expect(enrollment).toHaveProperty('id');
    expect(enrollment).toHaveProperty('endDate');
    expect(enrollment.total).toBe(total);
  });
});
