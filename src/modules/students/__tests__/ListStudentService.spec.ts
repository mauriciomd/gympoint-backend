import 'reflect-metadata';

import CreateStudentService from '../services/CreateStudentService';
import ListStudentService from '../services/ListStudentService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';

let sut: ListStudentService;
let createStudentService: CreateStudentService;
let fakeStudentRepository: FakeStudentRepository;
describe('Unit test: ListStudentService', () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    createStudentService = new CreateStudentService(fakeStudentRepository);
    sut = new ListStudentService(fakeStudentRepository);
  });

  it('should be able to list all the Students', async () => {
    await createStudentService.execute({
      name: 'Valid Student',
      email: 'student@test.com',
      age: 33,
      height: 190,
      weight: 110,
    });

    await createStudentService.execute({
      name: 'Valid Student',
      email: 'valid@test.com',
      age: 33,
      height: 190,
      weight: 110,
    });

    const response = await sut.execute();
    expect(response).toHaveLength(2);
  });
});
