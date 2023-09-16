import { AuthLogInDto } from '../../../../../src/models/dto/auth/auth-login.dto';

export class AuthLoginDtoFactory {
  static build(): AuthLogInDto {
    const authLoginDto = new AuthLogInDto();
    authLoginDto.username = 'testUser';
    authLoginDto.password = 'Abc1234*';

    return authLoginDto;
  }
}
