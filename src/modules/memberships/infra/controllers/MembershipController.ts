import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateMembershipService from '../../services/CreateMembershipService';
import HttpRequestError from '../../../../shared/errors/HttpRequestError';

class MembershipController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { title, price, duration } = request.body;
    const service = container.resolve(CreateMembershipService);

    try {
      if (!title) {
        throw new HttpRequestError('You must inform a title');
      }

      if (!price) {
        throw new HttpRequestError('You must inform a price');
      }

      const membership = await service.execute({
        title,
        price,
        duration,
      });

      return response.json(membership);
    } catch (err) {
      next(err);
    }

    return undefined;
  }
}

export default MembershipController;
