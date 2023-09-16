export const mockEducationRepository = () => ({
  findEducationByUserId: jest.fn(),
  createEducation: jest.fn(),
  updateEducation: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
});
