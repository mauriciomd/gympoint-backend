import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateQuestionService from '../../services/CreateQuestionService';
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
}

export default HelpOrderController;
