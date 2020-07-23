import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMembershipService from '../../services/CreateMembershipService';

class MembershipController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, price, duration } = request.body;
    const service = container.resolve(CreateMembershipService);
    const membership = await service.execute({
      title,
      price,
      duration,
    });

    return response.json(membership);
  }
}

export default MembershipController;
