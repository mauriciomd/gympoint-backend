import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateQuestionService from '../../services/CreateQuestionService';
import ListQuestionService from '../../services/ListQuestionService';
import HttpRequestError from '../../../../shared/errors/HttpRequestError';

class HelpOrderController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { studentId } = request.params;
    const { question } = request.body;

    try {
      if (!studentId) {
        throw new HttpRequestError('Missing route param: studentId');
      }

      if (!question) {
        throw new HttpRequestError('Missing param: question');
      }

      const service = container.resolve(CreateQuestionService);
      const order = await service.execute({
        studentId,
        question,
      });

      return response.json(order);
    } catch (err) {
      next(err);
    }

    return undefined;
  }

  public async index(_: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListQuestionService);
    const orders = await service.execute();

    return response.json(orders);
  }
}

export default HelpOrderController;
