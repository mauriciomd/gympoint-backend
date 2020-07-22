import ITokenProvider from '../models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public sign(payload: string): string {
    return payload;
  }
}

export default FakeTokenProvider;
