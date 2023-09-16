export const mockBulletPointRepository = () => ({
  createBulletPoint: jest.fn(),
  updateBulletPoint: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
  findBulletPointByProjects: jest.fn(),
  findBulletPointByWorkExperiences: jest.fn(),
});
