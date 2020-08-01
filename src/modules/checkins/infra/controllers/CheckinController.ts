import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateCheckinService from '../../services/CreateCheckinService';
import HttpRequestError from '../../../../shared/errors/HttpRequestError';

class CheckinController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { studentId } = request.params;
    try {
      if (!studentId) {
        throw new HttpRequestError('Missing route param: student id');
      }

      const service = container.resolve(CreateCheckinService);
      const checkin = await service.execute({ studentId });

      return response.json(checkin);
    } catch (err) {
      next(err);
    }
    return undefined;
  }

  // public async index(
  //   _: Request,
  //   response: Response,
  //   next: NextFunction,
  // ): Promise<Response | undefined> { }
}

export default CheckinController;
