import ITokenProvider from '../models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public async sign(payload: string): Promise<string> {
    return payload;
  }
}

export default FakeTokenProvider;
