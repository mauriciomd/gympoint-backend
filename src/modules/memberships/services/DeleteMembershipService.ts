import { injectable, inject } from 'tsyringe';

import IMembershipRepository from '../repositories/IMembershipRepository';

@injectable()
class ListMembershipService {
  private membershipRepository: IMembershipRepository;

  constructor(
    @inject('MembershipRepository')
    membershipRepository: IMembershipRepository,
  ) {
    this.membershipRepository = membershipRepository;
  }

  public async execute(membershipId: string): Promise<void> {
    this.membershipRepository.delete(membershipId);
  }
}

export default ListMembershipService;
