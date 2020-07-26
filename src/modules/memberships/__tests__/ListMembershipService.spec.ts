import 'reflect-metadata';

import CreateMembershipService from '../services/CreateMembershipService';
import ListMembershipService from '../services/ListMembershipService';
import FakeMembershipRepository from '../repositories/fakes/FakeMembershipRepository';

let sut: ListMembershipService;
let createMembershipService: CreateMembershipService;
let fakeMembershipRepository: FakeMembershipRepository;
describe('Unit test: ListMembershipService', () => {
  beforeEach(() => {
    fakeMembershipRepository = new FakeMembershipRepository();
    createMembershipService = new CreateMembershipService(
      fakeMembershipRepository,
    );
    sut = new ListMembershipService(fakeMembershipRepository);
  });

  it('should be able to list all the memberships', async () => {
    await createMembershipService.execute({
      title: 'Silver',
      duration: 12,
      price: 99,
    });

    await createMembershipService.execute({
      title: 'Gold',
      duration: 12,
      price: 129,
    });

    const response = await sut.execute();

    expect(response).toHaveLength(2);
  });
});
