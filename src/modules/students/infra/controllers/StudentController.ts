import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateStudentService from '../../services/CreateStudentService';
import HttpRequestError from '../../../../shared/errors/HttpRequestError';

class StudentController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const bodyProprerties = ['name', 'email', 'age', 'height', 'weight'];
    const service = container.resolve(CreateStudentService);

    try {
      bodyProprerties.forEach(property => {
        if (!request.body[property]) {
          throw new HttpRequestError(`Missing param: ${property}`);
        }
      });

      const { name, email, age, height, weight } = request.body;
      const student = await service.execute({
        name,
        email,
        age,
        height,
        weight,
      });
      return response.json(student);
    } catch (err) {
      next(err);
    }

    return undefined;
  }
}

export default StudentController;
