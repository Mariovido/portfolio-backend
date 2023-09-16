import { JwtPayload } from '../../../../src/models/interfaces/jwt-payload.interface';
import { User } from '../../../../src/repositories/entities/user.entity';

export class JwtPayloadFactory {
  static build(mockUser: User): JwtPayload {
    const jwtPayload: JwtPayload = {
      username: mockUser.username,
    };

    return jwtPayload;
  }
}
