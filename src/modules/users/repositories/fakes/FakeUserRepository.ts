import IUserRepository from '../IUserRepository';
import User from '../../infra/typeorm/entities/User';

class FakeUserRepository implements IUserRepository {
  private repository: User[] = [];

  constructor() {
    const user = new User();
    user.id = '123';
    user.name = 'Administrador';
    user.email = 'admin@gympoint.com';
    user.createdAt = new Date();
    user.updatedAt = new Date();

    this.repository.push(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.repository.find(user => user.email === email);

    return findUser;
  }
}

export default FakeUserRepository;
