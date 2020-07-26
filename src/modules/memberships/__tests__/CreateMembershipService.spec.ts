import 'reflect-metadata';

import CreateMembershipService from '../services/CreateMembershipService';
import FakeMembershipRepository from '../repositories/fakes/FakeMembershipRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: CreateMembershipService;
let fakeMembershipRepository: FakeMembershipRepository;
describe('Unit test: CreateMembership', () => {
  beforeEach(() => {
    fakeMembershipRepository = new FakeMembershipRepository();
    sut = new CreateMembershipService(fakeMembershipRepository);
  });

  it('should be called with correct params', async () => {
    const executeMethod = jest.spyOn(sut, 'execute');

    await sut.execute({
      title: 'Valid title',
      duration: 12,
      price: 69,
    });

    expect(executeMethod).toBeCalledWith({
      title: 'Valid title',
      duration: 12,
      price: 69,
    });
  });

  it('should not be able to create a membership with duration less than 1', async () => {
    await expect(
      sut.execute({
        title: 'Valid title',
        duration: 0,
        price: 69,
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });

  it('should not be able to create a membership with price less than 0', async () => {
    await expect(
      sut.execute({
        title: 'Valid title',
        duration: 10,
        price: -5,
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });

  it('should be able to create a membership option', async () => {
    const membership = await sut.execute({
      title: 'Valid title',
      duration: 12,
      price: 69,
    });

    expect(membership).toHaveProperty('id');
    expect(membership).toHaveProperty('title');
  });

  it('should not be able to create a membership with the an used title', async () => {
    await sut.execute({
      title: 'Valid title',
      duration: 12,
      price: 69,
    });

    await expect(
      sut.execute({
        title: 'Valid title',
        duration: 12,
        price: 69,
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });
});
