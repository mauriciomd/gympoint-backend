import { sign, verify } from 'jsonwebtoken';
import ITokenProvider from '../models/ITokenProvider';
import authConfig from '../../../../../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

class JWTTokenProvider implements ITokenProvider {
  public sign(payload: string): string {
    const { appSecret, expiresIn } = authConfig.jwt;

    const token = sign({}, appSecret, {
      expiresIn,
      subject: payload,
    });

    return token;
  }

  public verify(token: string): string {
    try {
      const decodedToken = verify(token, authConfig.jwt.appSecret);
      const { sub } = decodedToken as ITokenPayload;

      return sub;
    } catch {
      throw new Error();
    }
  }
}

export default JWTTokenProvider;
