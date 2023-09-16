import { AuthTokenResponseDto } from '../../../../../src/models/dto/auth/auth-token-response.dto';
import { User } from '../../../../../src/repositories/entities/user.entity';

export class AuthTokenResponseDtoFactory {
  static build(mockUser: User): AuthTokenResponseDto {
    const authTokenResponseDto = new AuthTokenResponseDto();
    authTokenResponseDto.idUser = mockUser.id;
    authTokenResponseDto.accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNjk0NDQyOTY2LCJleHAiOjE2OTQ0NDY1NjZ9.Yq5I0xHeMzQdBfGbTdeTfiU0xSsQg0DT-CcnGv7mvvc';

    return authTokenResponseDto;
  }
}
