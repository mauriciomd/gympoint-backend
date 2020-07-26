import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '../../services/CreateSessionService';
import HttpRequestError from '../../../../shared/errors/HttpRequestError';

class SessionController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { email, password } = request.body;

    try {
      if (!email) {
        throw new HttpRequestError('You have to inform an email');
      }

      if (!password) {
        throw new HttpRequestError('You have to inform an password');
      }

      const service = container.resolve(CreateSessionService);
      const session = await service.execute({
        email,
        password,
      });

      return response.json(session);
    } catch (err) {
      next(err);
    }

    return undefined;
  }
}

export default SessionController;
