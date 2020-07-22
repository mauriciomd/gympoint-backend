import { ICreateMembershipDTO } from '../dtos/ICreateMembershipDTO';

class CreateMembershipService {
  constructor() { }

  public async execute({
    title,
    duration,
    price,
  }: ICreateMembershipDTO): Promise<void> { }
}

export default CreateMembershipService;
