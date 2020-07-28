import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateStudentService from '../../services/CreateStudentService';
import HttpRequestError from '../../../../shared/errors/HttpRequestError';
import ListStudentService from '../../services/ListStudentService';

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

  public async index(_: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListStudentService);
    const students = await service.execute();

    return response.json(students);
  }
}

export default StudentController;
