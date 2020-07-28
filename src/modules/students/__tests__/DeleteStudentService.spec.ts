import 'reflect-metadata';

import CreateStudentService from '../services/CreateStudentService';
import ListStudentService from '../services/ListStudentService';
import DeleteStudentService from '../services/DeleteStudentService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: DeleteStudentService;
let listStudentService: ListStudentService;
let createStudentService: CreateStudentService;
let fakeStudentRepository: FakeStudentRepository;

describe('Unit test: DeleteStudentService', () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    createStudentService = new CreateStudentService(fakeStudentRepository);
    listStudentService = new ListStudentService(fakeStudentRepository);
    sut = new DeleteStudentService(fakeStudentRepository);
  });

  it('should be called with correct params', async () => {
    const Student = await createStudentService.execute({
      name: 'Student Test',
      email: 'student@test.com',
      age: 33,
      height: 190,
      weight: 110,
    });
    const executeMethod = jest.spyOn(sut, 'execute');

    await sut.execute(Student.id);
    expect(executeMethod).toHaveBeenCalledWith(Student.id);
  });

  it('should be able to delete a Student', async () => {
    const Student = await createStudentService.execute({
      name: 'Student Test',
      email: 'student@test.com',
      age: 33,
      height: 190,
      weight: 110,
    });

    await sut.execute(Student.id);

    const response = await listStudentService.execute();
    expect(response).toHaveLength(0);
  });

  it('should not be able to delete a Student with an invalid id', async () => {
    await expect(sut.execute('invalid-user-id')).rejects.toBeInstanceOf(
      HttpRequestError,
    );
  });
});
