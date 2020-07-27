import { injectable, inject } from 'tsyringe';

import IMembershipRepository from '../repositories/IMembershipRepository';
import Membership from '../infra/typeorm/entities/Membership';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

@injectable()
class ShowMembershipService {
  private membershipRepository: IMembershipRepository;

  constructor(
    @inject('MembershipRepository')
    membershipRepository: IMembershipRepository,
  ) {
    this.membershipRepository = membershipRepository;
  }

  public async execute(membershipId: string): Promise<Membership> {
    const membership = await this.membershipRepository.findById(membershipId);
    if (!membership) {
      throw new HttpRequestError('Invalid membership id');
    }

    return membership;
  }
}

export default ShowMembershipService;
