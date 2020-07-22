import User from '../infra/typeorm/entities/User';

export interface ISessionDTO {
  user: User;
  token: string;
}
