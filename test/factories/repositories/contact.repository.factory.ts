export const mockContactRepository = () => ({
  findContactsByUserId: jest.fn(),
  createContact: jest.fn(),
  updateContact: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
});
