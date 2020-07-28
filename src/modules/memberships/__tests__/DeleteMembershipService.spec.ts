import 'reflect-metadata';

import CreateMembershipService from '../services/CreateMembershipService';
import ListMembershipService from '../services/ListMembershipService';
import DeleteMembershipService from '../services/DeleteMembershipService';
import FakeMembershipRepository from '../repositories/fakes/FakeMembershipRepository';

let sut: DeleteMembershipService;
let listMembershipService: ListMembershipService;
let createMembershipService: CreateMembershipService;
let fakeMembershipRepository: FakeMembershipRepository;

describe('Unit test: DeleteMembershipService', () => {
  beforeEach(() => {
    fakeMembershipRepository = new FakeMembershipRepository();
    createMembershipService = new CreateMembershipService(
      fakeMembershipRepository,
    );
    listMembershipService = new ListMembershipService(fakeMembershipRepository);
    sut = new DeleteMembershipService(fakeMembershipRepository);
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

  it('should be able to delete a membership', async () => {
    const membership = await createMembershipService.execute({
      title: 'Valid title',
      duration: 12,
      price: 129,
    });

    await sut.execute(membership.id);

    const response = await listMembershipService.execute();
    expect(response).toHaveLength(0);
  });
});
