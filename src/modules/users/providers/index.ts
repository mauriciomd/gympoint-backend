import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import HashProvider from './HashProvider/implementations/BCryptHashProvider';

import ITokenProvider from './TokenProvider/models/ITokenProvider';
import JWTTokenProvider from './TokenProvider/implementations/JWTTokenProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
container.registerSingleton<ITokenProvider>('TokenProvider', JWTTokenProvider);
