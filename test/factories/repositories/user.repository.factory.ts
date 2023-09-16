export const mockUserRepository = () => ({
  findOneBy: jest.fn(),
  getUser: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
});
