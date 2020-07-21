import { getRepository, Repository } from 'typeorm';
import IUserRepository from '../../../repositories/IUserRepository';
import User from '../entities/User';

class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export default UserRepository;
