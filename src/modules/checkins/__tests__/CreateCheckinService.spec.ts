import 'reflect-metadata';

import CreateCheckinService from '../services/CreateCheckinService';
import FakeStudentRepository from '../../students/repositories/fakes/FakeStudentRepository';
import FakeCheckinRepository from '../repositories/fakes/FakeCheckinRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: CreateCheckinService;
let fakeStudentRepository: FakeStudentRepository;
let fakeCheckinRepository: FakeCheckinRepository;
describe('Unit test: CreateCheckinService', () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    fakeCheckinRepository = new FakeCheckinRepository();
    sut = new CreateCheckinService(
      fakeCheckinRepository,
      fakeStudentRepository,
    );
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

    await sut.execute({ studentId: student.id });

    expect(executeMethod).toBeCalledWith({ studentId: student.id });
  });

  it('should not be to create a check-in with an invalid student id', async () => {
    await expect(
      sut.execute({ studentId: 'invalid-user-id' }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });

  it('should be able to create a new check-in', async () => {
    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    const checkin = await sut.execute({ studentId: student.id });

    expect(checkin).toHaveProperty('id');
    expect(checkin).toHaveProperty('createdAt');
    expect(checkin.studentId).toEqual(student.id);
  });

  it('should not be able to create two check-ins at the same day', async () => {
    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    await sut.execute({ studentId: student.id });
    await expect(sut.execute({ studentId: student.id })).rejects.toBeInstanceOf(
      HttpRequestError,
    );
  });

  it('should not be able to create more than 5 check-ins in the last 7 days', async () => {
    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => {
        return new Date(2020, 6, 1).valueOf();
      })
      .mockImplementationOnce(() => {
        return new Date(2020, 6, 2).valueOf();
      })
      .mockImplementationOnce(() => {
        return new Date(2020, 6, 3).valueOf();
      })
      .mockImplementationOnce(() => {
        return new Date(2020, 6, 4).valueOf();
      })
      .mockImplementationOnce(() => {
        return new Date(2020, 6, 5).valueOf();
      })
      .mockImplementationOnce(() => {
        return new Date(2020, 6, 6).valueOf();
      });

    fakeCheckinRepository.create({
      studentId: student.id,
    });

    fakeCheckinRepository.create({
      studentId: student.id,
    });

    fakeCheckinRepository.create({
      studentId: student.id,
    });

    fakeCheckinRepository.create({
      studentId: student.id,
    });

    fakeCheckinRepository.create({
      studentId: student.id,
    });

    await expect(sut.execute({ studentId: student.id })).rejects.toBeInstanceOf(
      HttpRequestError,
    );
  });
});
