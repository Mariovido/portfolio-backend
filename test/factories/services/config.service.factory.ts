export const mockConfigService = (config: Record<string, any> = {}) => ({
  get: jest.fn((key: string) => {
    if (config[key] !== undefined) return config[key];

    switch (key) {
      case 'JWT_SECRET':
        return 'supersecret';
      default:
        return null;
    }
  }),
});
