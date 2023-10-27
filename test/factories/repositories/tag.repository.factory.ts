export const mockTagRepository = () => ({
  createTag: jest.fn(),
  updateTag: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
  findTagByWorkExperiences: jest.fn(),
  findTagByProjects: jest.fn(),
});
