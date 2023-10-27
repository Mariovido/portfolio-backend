export const mockProjectRepository = () => ({
  findProjectsByUserId: jest.fn(),
  findProjectsByUserIdForPortfolio: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
});
