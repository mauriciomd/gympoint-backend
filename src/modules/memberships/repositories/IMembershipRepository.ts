import { ICreateMembershipDTO } from '../dtos/ICreateMembershipDTO';
import Membership from '../infra/typeorm/entities/Membership';

export default interface IMembershipRepository {
  create(data: ICreateMembershipDTO): Promise<Membership>;
  findByTile(title: string): Promise<Membership | undefined>;
  findById(membershipId: string): Promise<Membership | undefined>;
  findAll(): Promise<Membership[]>;
  delete(membershipId: string): Promise<void>;
}
