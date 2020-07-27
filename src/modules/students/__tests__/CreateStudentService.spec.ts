import 'reflect-metadata';

import CreateStudentService from '../services/CreateStudentService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';

let sut: CreateStudentService;
let fakeStudentRepository: FakeStudentRepository;
describe('Unit test: CreateMembership', () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    sut = new CreateStudentService(fakeStudentRepository);
  });

  it('should be called with correct params', async () => {
    const executeMethod = jest.spyOn(sut, 'execute');

    await sut.execute({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    expect(executeMethod).toHaveBeenCalledWith({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });
  });

  it('should be able to create a new student', async () => {
    const student = await sut.execute({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    expect(student).toHaveProperty('id');
    expect(student.name).toBe('valid name');
    expect(student.id).not.toBeFalsy();
  });
});
