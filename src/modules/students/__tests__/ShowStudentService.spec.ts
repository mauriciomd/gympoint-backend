import 'reflect-metadata';

import CreateStudentService from '../services/CreateStudentService';
import ShowStudentService from '../services/ShowStudentService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: ShowStudentService;
let createStudentService: CreateStudentService;
let fakeStudentRepository: FakeStudentRepository;
describe('Unit test: ShowStudentService', () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    createStudentService = new CreateStudentService(fakeStudentRepository);
    sut = new ShowStudentService(fakeStudentRepository);
  });

  it('should be able to show a specific Student', async () => {
    const student = await createStudentService.execute({
      name: 'Valid Student',
      email: 'student@test.com',
      age: 33,
      height: 190,
      weight: 110,
    });

    const response = await sut.execute(student.email);

    expect(response.id).toBe(student.id);
  });

  it('should not be able to show a Student without a valid id', async () => {
    await expect(sut.execute('invalid-student-id')).rejects.toBeInstanceOf(
      HttpRequestError,
    );
  });
});
