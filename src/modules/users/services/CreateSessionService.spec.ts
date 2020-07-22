import CreateSessionService from './CreateSessionService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: CreateSessionService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    sut = new CreateSessionService(fakeUserRepository, fakeHashProvider);
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

  it('shoud not be able to authenticate with an invalid user', async () => {
    await expect(
      sut.execute({
        email: 'invalid@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });

  it('shoud be not able to authenticate with an invalid password', async () => {
    await expect(
      sut.execute({
        email: 'admin@gympoint.com',
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });
});
