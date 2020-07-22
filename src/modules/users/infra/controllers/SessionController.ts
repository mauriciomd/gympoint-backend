import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '../../services/CreateSessionService';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const service = container.resolve(CreateSessionService);
    const session = await service.execute({
      email,
      password,
    });

    return response.json(session);
  }
}

export default SessionController;
