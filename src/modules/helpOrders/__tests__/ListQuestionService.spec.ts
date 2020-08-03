import 'reflect-metadata';

import ListQuestionService from '../services/ListQuestionService';
import FakeStudentRepository from '../../students/repositories/fakes/FakeStudentRepository';
import FakeHelpOrderRepository from '../repositories/fakes/FakeHelpOrderRepository';

let sut: ListQuestionService;
let fakeStudentRepository: FakeStudentRepository;
let fakeHelpOrderRepository: FakeHelpOrderRepository;
describe('Unit test: ListQuestionService', () => {
  beforeEach(() => {
    fakeStudentRepository = new FakeStudentRepository();
    fakeHelpOrderRepository = new FakeHelpOrderRepository();

    sut = new ListQuestionService(fakeHelpOrderRepository);
  });

  it('should be to list all unanswered the help orders', async () => {
    const student = await fakeStudentRepository.create({
      name: 'valid name',
      email: 'valid@email.com',
      age: 22,
      height: 189,
      weight: 110,
    });

    await fakeHelpOrderRepository.create({
      studentId: student.id,
      question: 'a valid question',
    });

    const orders = await sut.execute();
    expect(orders).toHaveLength(1);
  });
});
