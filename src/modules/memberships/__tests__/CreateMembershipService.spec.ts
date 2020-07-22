import CreateMembershipService from '../services/CreateMembershipService';
import HttpRequestError from '../../../shared/errors/HttpRequestError';

let sut: CreateMembershipService;

describe('Unit test: CreateMembership', () => {
  beforeEach(() => {
    sut = new CreateMembershipService();
  });

  it('should be called with correct params', async () => {
    const executeMethod = jest.spyOn(sut, 'execute');

    await sut.execute({
      title: 'Valid title',
      duration: 12,
      price: 69,
    });

    expect(executeMethod).toBeCalledWith({
      title: 'Valid title',
      duration: 12,
      price: 69,
    });
  });

  it('should not be able to create a membership with duration less than 1', async () => {
    await expect(
      sut.execute({
        title: 'Valid title',
        duration: 0,
        price: 69,
      }),
    ).rejects.toBeInstanceOf(HttpRequestError);
  });
});
