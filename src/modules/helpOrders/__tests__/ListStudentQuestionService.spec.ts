import 'reflect-metadata';

import ListStudentQuestionService from '../services/ListStudentQuestionService';
import FakeStudentRepository from '../../students/repositories/fakes/FakeStudentRepository';
import FakeHelpOrderRepository from '../repositories/fakes/FakeHelpOrderRepository';

let sut: ListStudentQuestionService;
let fakeStudentRepository: FakeStudentRepository;
let fakeHelpOrderRepository: FakeHelpOrderRepository;
describe('Unit test: ListStudentQuestionService', () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    fakeHelpOrderRepository = new FakeHelpOrderRepository();

    sut = new ListStudentQuestionService(
      fakeHelpOrderRepository,
      fakeStudentRepository,
    );
  });

  it('should be to list all the help orders of a specific student', async () => {
    const studentA = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'student-a@valid-mail.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    const studentB = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'student-b@valid-mail.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    await fakeHelpOrderRepository.create({
      studentId: studentA.id,
      question: 'a valid question',
    });

    await fakeHelpOrderRepository.create({
      studentId: studentB.id,
      question: 'a valid question',
    });

    const orders = await sut.execute(studentA.id);
    expect(orders).toHaveLength(1);
  });
});
