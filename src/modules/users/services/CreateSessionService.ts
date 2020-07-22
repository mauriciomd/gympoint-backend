import IUserRepository from '../repositories/IUserRepository';
import { ICreateSessionDTO } from '../dtos/ICreateSessionDTO';
import HttpRequestError from '../../../shared/errors/HttpRequestError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

class CreateSessionService {
  private userRepository: IUserRepository;

  private hashProver: IHashProvider;

  constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
    this.userRepository = userRepository;
    this.hashProver = hashProvider;
  }

  public async execute({ email, password }: ICreateSessionDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpRequestError('Invalid email/password');
    }

    const isPasswordMatched = await this.hashProver.compare({
      payload: password,
      compareTo: user.password,
    });

    if (!isPasswordMatched) {
      throw new HttpRequestError('Invalid email/password');
    }
  }
}

export default CreateSessionService;
