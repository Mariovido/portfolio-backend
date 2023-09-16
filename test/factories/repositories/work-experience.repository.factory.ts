export const mockWorkExperienceRepository = () => ({
  findWorkExperienceByUserId: jest.fn(),
  createWorkExperience: jest.fn(),
  updateWorkExperience: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
});
