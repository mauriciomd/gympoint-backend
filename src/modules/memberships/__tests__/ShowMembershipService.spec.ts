import 'reflect-metadata';

import CreateMembershipService from '../services/CreateMembershipService';
import ShowMembershipService from '../services/ShowMembershipService';
import FakeMembershipRepository from '../repositories/fakes/FakeMembershipRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: ShowMembershipService;
let createMembershipService: CreateMembershipService;
let fakeMembershipRepository: FakeMembershipRepository;

describe('Unit test: ShowMembershipService', () => {
  beforeEach(() => {
    fakeMembershipRepository = new FakeMembershipRepository();
    createMembershipService = new CreateMembershipService(
      fakeMembershipRepository,
    );
    sut = new ShowMembershipService(fakeMembershipRepository);
  });

  it('should be called with correct params', async () => {
    const membership = await createMembershipService.execute({
      title: 'Valid title',
      duration: 12,
      price: 129,
    });
    const executeMethod = jest.spyOn(sut, 'execute');

    await sut.execute(membership.id);
    expect(executeMethod).toHaveBeenCalledWith(membership.id);
  });

  it('should be able to show a membership', async () => {
    const membership = await createMembershipService.execute({
      title: 'Valid title',
      duration: 12,
      price: 129,
    });

    const response = await sut.execute(membership.id);
    expect(response.id).toBe(membership.id);
    expect(response.title).toBe(membership.title);
  });

  it('should not be able to show a membership with an invalid ID', async () => {
    await expect(sut.execute('Invalid membership id')).rejects.toBeInstanceOf(
      HttpRequestError,
    );
  });
});
