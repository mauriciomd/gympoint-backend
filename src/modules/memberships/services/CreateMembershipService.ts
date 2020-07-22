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

    if (price < 1) {
      throw new HttpRequestError(
        'Invalid price. User a number greater or equal to 0',
      );
    }
  }
}

export default CreateMembershipService;
