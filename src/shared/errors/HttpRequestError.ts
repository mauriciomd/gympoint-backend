class HttpRequestError {
  statusCode: number;

  message: string;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default HttpRequestError;
