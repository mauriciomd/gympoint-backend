import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateEnrollmentService from '../../services/CreateEnrollmentService';
import ListEnrollmentService from '../../services/ListEnrollmentService';
import HttpRequestError from '../../../../shared/errors/HttpRequestError';

class EnrollmentController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const bodyProperties = ['membershipId', 'studentId', 'startDate'];
    const { membershipId, studentId, startDate } = request.body;
    try {
      bodyProperties.forEach(property => {
        if (!request.body[property]) {
          throw new HttpRequestError(`Missing param ${property}`);
        }
      });
      const service = container.resolve(CreateEnrollmentService);
      const enrollment = await service.execute({
        membershipId,
        studentId,
        startDate: parseISO(startDate),
      });

      return response.json(enrollment);
    } catch (err) {
      next(err);
    }
    return undefined;
  }

  public async index(
    _: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const service = container.resolve(ListEnrollmentService);
      const enrollments = await service.execute();

      return response.json(enrollments);
    } catch (err) {
      next(err);
    }
    return undefined;
  }
}

export default EnrollmentController;
