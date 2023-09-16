export const mockInterestRepository = () => ({
  createInterest: jest.fn(),
  updateInterest: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
  findInterestByUserId: jest.fn(),
});
