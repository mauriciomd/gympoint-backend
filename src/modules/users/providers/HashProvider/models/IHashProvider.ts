import { IHashProviderDTO } from '../dtos/IHashProviderDTO';

export default interface IHashProvider {
  compare(data: IHashProviderDTO): Promise<boolean>;
}
