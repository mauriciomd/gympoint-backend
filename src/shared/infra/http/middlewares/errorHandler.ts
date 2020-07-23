import { Request, Response, NextFunction } from 'express';
import HttpRequestError from '../../../errors/HttpRequestError';

function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (err instanceof HttpRequestError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json(err);
}

export default errorHandler;
