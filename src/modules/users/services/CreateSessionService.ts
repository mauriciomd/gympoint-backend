import { ICreateSessionDTO } from '../dtos/ICreateSessionDTO';

import { ISessionDTO } from '../dtos/ISessionDTO';

import IUserRepository from '../repositories/IUserRepository';
import HttpRequestError from '../../../shared/errors/HttpRequestError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ITokenProvider from '../providers/TokenProvider/models/ITokenProvider';

class CreateSessionService {
  private userRepository: IUserRepository;

  private hashProver: IHashProvider;

  private tokenProvider: ITokenProvider;

  constructor(
    userRepository: IUserRepository,
    hashProvider: IHashProvider,
    tokenProvider: ITokenProvider,
  ) {
    this.userRepository = userRepository;
    this.hashProver = hashProvider;
    this.tokenProvider = tokenProvider;
  }

  public async execute({
    email,
    password,
  }: ICreateSessionDTO): Promise<ISessionDTO> {
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

    const token = await this.tokenProvider.sign(user.id);

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
