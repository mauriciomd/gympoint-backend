import { Repository, getRepository } from 'typeorm';

import IMembershipRepository from '../../../repositories/IMembershipRepository';
import { ICreateMembershipDTO } from '../../../dtos/ICreateMembershipDTO';
import Membership from '../entities/Membership';

class MembershipRepository implements IMembershipRepository {
  private membershipRepository: Repository<Membership>;

  constructor() {
    this.membershipRepository = getRepository(Membership);
  }

  public async create({
    title,
    duration,
    price,
  }: ICreateMembershipDTO): Promise<Membership> {
    const newMembership = this.membershipRepository.create({
      title,
      duration,
      price,
    });

    await this.membershipRepository.save(newMembership);
    return newMembership;
  }

  public async findByTile(title: string): Promise<Membership | undefined> {
    const membership = await this.membershipRepository.findOne({
      where: {
        title,
      },
    });

    return membership;
  }

  public async findById(membershipId: string): Promise<Membership | undefined> {
    const membership = await this.membershipRepository.findOne({
      where: {
        id: membershipId,
      },
    });

    return membership;
  }

  public async findAll(): Promise<Membership[]> {
    const memberships = await this.membershipRepository.find();

    return memberships;
  }

  public async delete(membershipId: string): Promise<void> {
    await this.membershipRepository.delete({ id: membershipId });
  }
}

export default MembershipRepository;
