import { AuthSignUpDto } from '../../../../../src/models/dto/auth/auth-signup.dto';

export class AuthSignUpDtoFactory {
  static build(): AuthSignUpDto {
    const authSignUpDto = new AuthSignUpDto();
    authSignUpDto.username = 'testUser';
    authSignUpDto.password = 'Abc1234*';
    authSignUpDto.firstName = 'test';
    authSignUpDto.lastName = 'name last';
    authSignUpDto.dateOfBirth = new Date();

    return authSignUpDto;
  }
}
