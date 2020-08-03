import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateAnswerService from '../../services/CreateAnswerService';
import HttpRequestError from '../../../../shared/errors/HttpRequestError';

class HelpAnswerController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { orderId } = request.params;
    const { answer } = request.body;

    try {
      if (!orderId) {
        throw new HttpRequestError('Missing route param: orderId');
      }

      if (!answer) {
        throw new HttpRequestError('Missing param: answer');
      }

      const service = container.resolve(CreateAnswerService);
      const order = await service.execute({
        orderId,
        answer,
      });

      return response.json(order);
    } catch (err) {
      next(err);
    }

    return undefined;
  }
}

export default HelpAnswerController;
