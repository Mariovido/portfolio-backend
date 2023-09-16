export const mockSkillRepository = () => ({
  findSkillsByUserId: jest.fn(),
  createSkill: jest.fn(),
  updateSkill: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
});
