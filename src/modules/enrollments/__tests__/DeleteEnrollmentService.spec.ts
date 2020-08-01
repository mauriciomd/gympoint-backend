import 'reflect-metadata';

import CreateEnrollmentService from '../services/CreateEnrollmentService';
import ListEnrollmentService from '../services/ListEnrollmentService';
import DeleteEnrollmentService from '../services/DeleteEnrollmentService';
import FakeEnrollmentRepository from '../repositories/fakes/FakeEnrollmentRepository';
import FakeMembershipRepository from '../../memberships/repositories/fakes/FakeMembershipRepository';
import FakeStudentRepository from '../../students/repositories/fakes/FakeStudentRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: DeleteEnrollmentService;
let createEnrollmentService: CreateEnrollmentService;
let listEnrollmentService: ListEnrollmentService;
let fakeEnrollmentRepository: FakeEnrollmentRepository;
let fakeMembershipRepository: FakeMembershipRepository;
let fakeStudentRepository: FakeStudentRepository;
describe('Unit test: DeleteEnrollmentService', () => {
  beforeEach(() => {
    fakeEnrollmentRepository = new FakeEnrollmentRepository();
    fakeMembershipRepository = new FakeMembershipRepository();
    fakeStudentRepository = new FakeStudentRepository();

    createEnrollmentService = new CreateEnrollmentService(
      fakeEnrollmentRepository,
      fakeStudentRepository,
      fakeMembershipRepository,
    );

    listEnrollmentService = new ListEnrollmentService(fakeEnrollmentRepository);
    sut = new DeleteEnrollmentService(fakeEnrollmentRepository);
  });

  it('should be called with correct params', async () => {
    const student = await fakeStudentRepository.create({
      name: 'Student Name',
      email: 'valid@email.com',
      age: 22,
      height: 199,
      weight: 102,
    });

    const membership = await fakeMembershipRepository.create({
      title: 'Valid Membership',
      duration: 12,
      price: 9,
    });

    const enrollment = await createEnrollmentService.execute({
      studentId: student.id,
      membershipId: membership.id,
      startDate: new Date(),
    });

    const executeMethod = jest.spyOn(sut, 'execute');
    await sut.execute(enrollment.id);

    expect(executeMethod).toHaveBeenCalledWith(enrollment.id);
  });

  it('should not be able to delete an enrollment with an invalid id', async () => {
    await expect(sut.execute('invalid-enrollment-id')).rejects.toBeInstanceOf(
      HttpRequestError,
    );
  });

  it('should be able to delete an enrollment', async () => {
    const student = await fakeStudentRepository.create({
      name: 'Student Name',
      email: 'valid@email.com',
      age: 22,
      height: 199,
      weight: 102,
    });

    const membership = await fakeMembershipRepository.create({
      title: 'Valid Membership',
      duration: 12,
      price: 9,
    });

    const enrollment = await createEnrollmentService.execute({
      studentId: student.id,
      membershipId: membership.id,
      startDate: new Date(),
    });

    let enrollmentList = await listEnrollmentService.execute();
    expect(enrollmentList).toHaveLength(1);

    await sut.execute(enrollment.id);
    enrollmentList = await listEnrollmentService.execute();
    expect(enrollmentList).toHaveLength(0);
  });
});
