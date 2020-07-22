import IMembershipRepository from '../repositories/IMembershipRepository';
import { ICreateMembershipDTO } from '../dtos/ICreateMembershipDTO';
import Membership from '../infra/typeorm/entities/Membership';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

class CreateMembershipService {
  private membershipRepository: IMembershipRepository;

  constructor(membershipRepository: IMembershipRepository) {
    this.membershipRepository = membershipRepository;
  }

  public async execute({
    title,
    duration,
    price,
  }: ICreateMembershipDTO): Promise<Membership> {
    if (duration < 1) {
      throw new HttpRequestError(
        'Invalid duration. User a number greater than 0',
      );
    }

    if (price < 1) {
      throw new HttpRequestError(
        'Invalid price. User a number greater or equal to 0',
      );
    }

    const hasMembership = await this.membershipRepository.findByTile(title);
    if (hasMembership) {
      throw new HttpRequestError('This title is already used');
    }

    const membership = await this.membershipRepository.create({
      title,
      duration,
      price,
    });

    return membership;
  }
}

export default CreateMembershipService;
