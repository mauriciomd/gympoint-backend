import ITokenProvider from '../models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public sign(payload: string): string {
    return payload;
  }

  public verify(token: string): string {
    return token;
  }
}

export default FakeTokenProvider;
