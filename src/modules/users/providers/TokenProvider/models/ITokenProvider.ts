export default interface ITokenProvider {
  sign(payload: string): Promise<string>;
}
