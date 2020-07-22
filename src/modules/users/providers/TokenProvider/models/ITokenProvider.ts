export default interface ITokenProvider {
  sign(payload: string): string;
}
