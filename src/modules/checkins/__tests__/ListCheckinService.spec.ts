import 'reflect-metadata';

import ListCheckinService from '../services/ListCheckinService';
import FakeStudentRepository from '../../students/repositories/fakes/FakeStudentRepository';
import FakeCheckinRepository from '../repositories/fakes/FakeCheckinRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: ListCheckinService;
let fakeStudentRepository: FakeStudentRepository;
let fakeCheckinRepository: FakeCheckinRepository;
describe('Unit test: ListCheckinService', () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    fakeCheckinRepository = new FakeCheckinRepository();
    sut = new ListCheckinService(fakeCheckinRepository, fakeStudentRepository);
  });

  it('should be called with correct params', async () => {
    const executeMethod = jest.spyOn(sut, 'execute');
    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    await sut.execute(student.id);

    expect(executeMethod).toBeCalledWith(student.id);
  });

  it('should not be to list the check-ins with an invalid student id', async () => {
    await expect(sut.execute('invalid-user-id')).rejects.toBeInstanceOf(
      HttpRequestError,
    );
  });

  it('should be able to list all the students check-ins', async () => {
    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    await fakeCheckinRepository.create({
      studentId: student.id,
    });

    const response = await sut.execute(student.id);
    expect(response).toHaveLength(1);
  });
});
