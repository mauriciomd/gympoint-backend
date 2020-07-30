import 'reflect-metadata';

import CreateEnrollmentService from '../services/CreateEnrollmentService';
import ListEnrollmentService from '../services/ListEnrollmentService';
import FakeEnrollmentRepository from '../repositories/fakes/FakeEnrollmentRepository';
import FakeMembershipRepository from '../../memberships/repositories/fakes/FakeMembershipRepository';
import FakeStudentRepository from '../../students/repositories/fakes/FakeStudentRepository';

let sut: ListEnrollmentService;
let createEnrollmentService: CreateEnrollmentService;
let fakeEnrollmentRepository: FakeEnrollmentRepository;
let fakeMembershipRepository: FakeMembershipRepository;
let fakeStudentRepository: FakeStudentRepository;
describe('Unit test: ListEnrollmentService', () => {
  beforeEach(() => {
    fakeEnrollmentRepository = new FakeEnrollmentRepository();
    fakeMembershipRepository = new FakeMembershipRepository();
    fakeStudentRepository = new FakeStudentRepository();

    createEnrollmentService = new CreateEnrollmentService(
      fakeEnrollmentRepository,
      fakeStudentRepository,
      fakeMembershipRepository,
    );
    sut = new ListEnrollmentService(fakeEnrollmentRepository);
  });

  it('should be able to list all the Enrollments', async () => {
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

    await createEnrollmentService.execute({
      studentId: student.id,
      membershipId: membership.id,
      startDate: new Date(),
    });

    const response = await sut.execute();

    expect(response).toHaveLength(1);
    expect(response[0]).toHaveProperty('isActive');
    expect(response[0].isActive).toBe(true);
  });
});
