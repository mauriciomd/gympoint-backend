import { sign } from 'jsonwebtoken';
import ITokenProvider from '../models/ITokenProvider';
import authConfig from '../../../../../config/auth';

class JWTTokenProvider implements ITokenProvider {
  public sign(payload: string): string {
    const { appSecret, expiresIn } = authConfig.jwt;

    const token = sign({}, appSecret, {
      expiresIn,
      subject: payload,
    });

    return token;
  }
}

export default JWTTokenProvider;
