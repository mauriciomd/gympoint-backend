import IUserRepository from '../repositories/IUserRepository';
import { ICreateSessionDTO } from '../dtos/ICreateSessionDTO';
import User from '../infra/typeorm/entities/User';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

interface ISessionDTO {
  user: User;
  token: string;
}

class CreateSessionService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: ICreateSessionDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpRequestError('Invalid user');
    }
  }
}

export default CreateSessionService;
