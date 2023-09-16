export const mockTechnologyRepository = () => ({
  createTechnology: jest.fn(),
  updateTechnology: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
  findTechnologyByProjects: jest.fn(),
});
