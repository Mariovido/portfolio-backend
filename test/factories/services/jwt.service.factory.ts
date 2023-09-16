import { JwtPayload } from '../../../src/models/interfaces/jwt-payload.interface';

export const mockJwtService = () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sign: jest.fn((_payload: JwtPayload) => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNjk0NDQyOTY2LCJleHAiOjE2OTQ0NDY1NjZ9.Yq5I0xHeMzQdBfGbTdeTfiU0xSsQg0DT-CcnGv7mvvc';
  }),
});
