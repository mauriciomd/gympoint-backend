import { compare } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';
import { IHashProviderDTO } from '../dtos/IHashProviderDTO';

class BCryptHashProvider implements IHashProvider {
  public async compare({
    payload,
    compareTo,
  }: IHashProviderDTO): Promise<boolean> {
    return compare(payload, compareTo);
  }
}

export default BCryptHashProvider;
