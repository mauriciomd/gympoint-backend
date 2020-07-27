import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateMembershipService from '../../services/CreateMembershipService';
import ListMembershipService from '../../services/ListMembershipService';
import ShowMembershipService from '../../services/ShowMembershipService';
import DeleteMembershipService from '../../services/DeleteMembershipService';
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

      if (!duration) {
        throw new HttpRequestError('You must inform a duration');
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

  public async index(_: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListMembershipService);
    const memberships = await service.execute();

    return response.json(memberships);
  }

  public async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { membershipId } = request.params;
    const service = container.resolve(ShowMembershipService);

    try {
      const memberships = await service.execute(membershipId);
      return response.json(memberships);
    } catch (err) {
      next(err);
    }

    return undefined;
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { membershipId } = request.params;
    const service = container.resolve(DeleteMembershipService);

    try {
      await service.execute(membershipId);
      return response.send();
    } catch (err) {
      next(err);
    }

    return undefined;
  }
}

export default MembershipController;
