import { ICreateMembershipDTO } from '../dtos/ICreateMembershipDTO';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

class CreateMembershipService {
  constructor() { }

  public async execute({
    title,
    duration,
    price,
  }: ICreateMembershipDTO): Promise<void> {
    if (duration < 1) {
      throw new HttpRequestError(
        'Invalid duration. User a number greater than 0',
      );
    }
  }
}

export default CreateMembershipService;
