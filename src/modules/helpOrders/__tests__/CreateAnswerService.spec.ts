import 'reflect-metadata';

import CreateAnswerService from '../services/CreateAnswerService';
import FakeStudentRepository from '../../students/repositories/fakes/FakeStudentRepository';
import FakeHelpOrderRepository from '../repositories/fakes/FakeHelpOrderRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: CreateAnswerService;
let fakeStudentRepository: FakeStudentRepository;
let fakeHelpOrderRepository: FakeHelpOrderRepository;
describe('Unit test: CreateAnswerService', () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    fakeHelpOrderRepository = new FakeHelpOrderRepository();

    sut = new CreateAnswerService(fakeHelpOrderRepository);
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

    const order = await fakeHelpOrderRepository.create({
      question: 'valid question',
      studentId: student.id,
    });

    await sut.execute({
      orderId: order.id,
      answer: 'a valid answer',
    });

    expect(executeMethod).toHaveBeenCalledWith({
      orderId: order.id,
      answer: 'a valid answer',
    });
  });

  it('should not be able to answer an invalid order', async () => {
    await expect(
      sut.execute({
        orderId: 'invalid-order-id',
        answer: 'a valid answer',
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });

  it('should be able to answer a help order request', async () => {
    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    const order = await fakeHelpOrderRepository.create({
      question: 'valid question',
      studentId: student.id,
    });

    const answered = await sut.execute({
      orderId: order.id,
      answer: 'a valid answer',
    });

    expect(answered).toHaveProperty('id');
    expect(answered).toHaveProperty('answeredAt');
    expect(answered.answer).toEqual('a valid answer');
  });
});
