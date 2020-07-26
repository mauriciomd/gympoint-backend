import { injectable, inject } from 'tsyringe';

import IMembershipRepository from '../repositories/IMembershipRepository';
import Membership from '../infra/typeorm/entities/Membership';

@injectable()
class ListMembershipService {
  private membershipRepository: IMembershipRepository;

  constructor(
    @inject('MembershipRepository')
    membershipRepository: IMembershipRepository,
  ) {
    this.membershipRepository = membershipRepository;
  }

  public async execute(): Promise<Membership[]> {
    const membership = this.membershipRepository.findAll();

    return membership;
  }
}

export default ListMembershipService;
