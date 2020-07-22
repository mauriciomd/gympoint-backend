import CreateSessionService from './CreateSessionService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: CreateSessionService;
let fakeUserRepository: FakeUserRepository;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    sut = new CreateSessionService(fakeUserRepository);
  });

  it('should be called with correct params', async () => {
    const executeMethod = jest.spyOn(sut, 'execute');

    await sut.execute({
      email: 'admin@gympoint.com',
      password: '123456',
    });

    expect(executeMethod).toBeCalledWith({
      email: 'admin@gympoint.com',
      password: '123456',
    });
  });
});
