import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateEnrollmentServie from '../../services/CreateEnrollmentService';
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
      const service = container.resolve(CreateEnrollmentServie);
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
}

export default EnrollmentController;
