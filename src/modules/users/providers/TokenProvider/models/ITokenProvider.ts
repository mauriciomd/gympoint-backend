export default interface ITokenProvider {
  sign(payload: string): string;
  verify(token: string): string;
}
