import 'reflect-metadata';

import CreateStudentService from '../services/CreateStudentService';
import UpdateStudentService from '../services/UpdateStudentService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: UpdateStudentService;
let createStudentService: CreateStudentService;
let fakeStudentRepository: FakeStudentRepository;
describe('Unit test: UpdateStudentService', () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    createStudentService = new CreateStudentService(fakeStudentRepository);
    sut = new UpdateStudentService(fakeStudentRepository);
  });

  it('should be able to update a specific Student', async () => {
    const student = await createStudentService.execute({
      name: 'Valid Student',
      email: 'student@test.com',
      age: 33,
      height: 190,
      weight: 110,
    });

    const response = await sut.execute({
      id: student.id,
      name: 'New Valid Student',
      email: 'new-valid-student@email.com',
      age: 33,
      height: 190,
      weight: 110,
    });

    expect(response.name).toBe('New Valid Student');
    expect(response.email).toBe('new-valid-student@email.com');
  });

  it('should be able to update just one property of a specific Student', async () => {
    const student = await createStudentService.execute({
      name: 'Valid Student',
      email: 'student@test.com',
      age: 33,
      height: 190,
      weight: 110,
    });

    const response = await sut.execute({
      id: student.id,
      name: 'New Valid Student',
    });

    expect(response.name).toBe('New Valid Student');
    expect(response.email).toBe('student@test.com');
  });

  it('should not be able to show a Student without a valid id', async () => {
    await expect(
      sut.execute({
        id: 'invalid-student-id',
        name: 'Valid Student',
        email: 'student@test.com',
        age: 33,
        height: 190,
        weight: 110,
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });

  it('should not be able to update a Student email to one already used', async () => {
    await createStudentService.execute({
      name: 'Valid Student',
      email: 'student@test.com',
      age: 33,
      height: 190,
      weight: 110,
    });

    const student = await createStudentService.execute({
      name: 'Valid Student',
      email: 'valid@email.com',
      age: 33,
      height: 190,
      weight: 110,
    });

    await expect(
      sut.execute({
        id: student.id,
        email: 'student@test.com',
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });
});
