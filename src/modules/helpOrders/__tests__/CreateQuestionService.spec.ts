import 'reflect-metadata';

import CreateQuestionService from '../services/CreateQuestionService';
import FakeStudentRepository from '../../students/repositories/fakes/FakeStudentRepository';
import FakeHelpOrderRepository from '../repositories/fakes/FakeHelpOrderRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: CreateQuestionService;
let fakeStudentRepository: FakeStudentRepository;
let fakeHelpOrderRepository: FakeHelpOrderRepository;
describe('Unit test: CreateQuestionService', () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    fakeHelpOrderRepository = new FakeHelpOrderRepository();

    sut = new CreateQuestionService(
      fakeHelpOrderRepository,
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

    await sut.execute({
      studentId: student.id,
      question: 'a valid question',
    });

    expect(executeMethod).toHaveBeenCalledWith({
      studentId: student.id,
      question: 'a valid question',
    });
  });

  it('should not be to create a HelpOrder without a valid student id', async () => {
    await expect(
      sut.execute({
        studentId: 'invalid-user-id',
        question: 'a valid question',
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });

  it('should be to create a HelpOrder', async () => {
    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    const order = await sut.execute({
      studentId: student.id,
      question: 'a valid question',
    });

    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('createdAt');
    expect(order.studentId).toEqual(student.id);
  });
});
