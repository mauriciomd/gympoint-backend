/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';

import HttpRequestError from '../../../../shared/errors/HttpRequestError';
import ITokenProvider from '../../providers/TokenProvider/models/ITokenProvider';

@injectable()
class RequireAuthentication {
  private tokenProvider: ITokenProvider;

  constructor(
    @inject('TokenProvider')
    tokenProvider: ITokenProvider,
  ) {
    this.tokenProvider = tokenProvider;
  }

  public ensure(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const { authorization } = request.headers;
    if (!authorization) {
      throw new HttpRequestError('JWT Token is missing!', 401);
    }

    const [_, token] = authorization.split(' ');
    try {
      const id = this.tokenProvider.verify(token);
      request.user = {
        id,
      };
      next();
    } catch {
      throw new HttpRequestError('Invalid JWT Token!', 401);
    }
  }
}

export default RequireAuthentication;
