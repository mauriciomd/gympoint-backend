import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateStudentService from '../../services/CreateStudentService';
import ListStudentService from '../../services/ListStudentService';
import ShowStudentService from '../../services/ShowStudentService';
import DeleteStudentService from '../../services/DeleteStudentService';
import UpdateStudentService from '../../services/UpdateStudentService';
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

  public async index(_: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListStudentService);
    const students = await service.execute();

    return response.json(students);
  }

  public async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { studentId } = request.params;
    const service = container.resolve(ShowStudentService);

    try {
      const students = await service.execute(studentId);
      return response.json(students);
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
    const { studentId } = request.params;
    const service = container.resolve(DeleteStudentService);

    try {
      const students = await service.execute(studentId);
      return response.json(students);
    } catch (err) {
      next(err);
    }

    return undefined;
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { studentId } = request.params;
    const service = container.resolve(UpdateStudentService);

    try {
      const { name, email, age, height, weight } = request.body;
      const student = await service.execute({
        id: studentId,
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
