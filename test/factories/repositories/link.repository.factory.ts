export const mockLinkRepository = () => ({
  createLink: jest.fn(),
  updateLink: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
  findLinksByParagraphs: jest.fn(),
  findLinksByWorkExperiences: jest.fn(),
  findLinksByContacts: jest.fn(),
  findLinksByProjects: jest.fn(),
});
