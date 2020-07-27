import { uuid } from 'uuidv4';

import IMembershipRepository from '../IMembershipRepository';
import { ICreateMembershipDTO } from '../../dtos/ICreateMembershipDTO';
import Membership from '../../infra/typeorm/entities/Membership';

class FakeMembershipRepository implements IMembershipRepository {
  private storedMemberships: Membership[] = [];

  public async create({
    title,
    duration,
    price,
  }: ICreateMembershipDTO): Promise<Membership> {
    const membership = new Membership();

    Object.assign(membership, {
      id: uuid(),
      title,
      duration,
      price,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.storedMemberships.push(membership);

    return membership;
  }

  public async findByTile(title: string): Promise<Membership | undefined> {
    const hasFoundMembership = this.storedMemberships.find(
      membership => membership.title === title,
    );

    return hasFoundMembership;
  }

  public async findById(membershipId: string): Promise<Membership | undefined> {
    const hasFoundMembership = this.storedMemberships.find(
      membership => membership.id === membershipId,
    );

    return hasFoundMembership;
  }

  public async findAll(): Promise<Membership[]> {
    return [...this.storedMemberships];
  }

  public async delete(membershipId: string): Promise<void> {
    this.storedMemberships = this.storedMemberships.filter(
      membership => membership.id !== membershipId,
    );
  }
}

export default FakeMembershipRepository;
