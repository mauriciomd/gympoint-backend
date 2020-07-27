import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateStudentService from '../../services/CreateStudentService';

class StudentController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { name, email, age, height, weight } = request.body;
    const service = container.resolve(CreateStudentService);

    try {
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
