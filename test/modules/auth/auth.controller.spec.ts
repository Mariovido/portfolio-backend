import { Test } from '@nestjs/testing';
import { AuthController } from '../../../src/modules/auth/auth.controller';
import { AuthService } from '../../../src/modules/auth/auth.service';
import { mockAuthService } from '../../factories/modules/auth/auth.service.factory';
import { AuthSignUpDto } from '../../../src/models/dto/auth/auth-signup.dto';
import { AuthSignUpDtoFactory } from '../../factories/models/dto/auth/auth-signup.dto.factory';
import { AuthLogInDto } from '../../../src/models/dto/auth/auth-login.dto';
import { AuthLoginDtoFactory } from '../../factories/models/dto/auth/auth-login.dto.factory';
import { AuthTokenResponseDto } from '../../../src/models/dto/auth/auth-token-response.dto';
import { AuthTokenResponseDtoFactory } from '../../factories/models/dto/auth/auth-token-response.dto';
import { User } from '../../../src/repositories/entities/user.entity';
import { UserFactory } from '../../factories/repositories/entities/user.entity.factory';

describe('AuthController', () => {
  let authController: AuthController;

  let authService: jest.Mocked<AuthService>;

  let mockUser: User;

  let mockAuthSignUpDto: AuthSignUpDto;
  let mockAuthLogInDto: AuthLogInDto;
  let mockAuthTokenResponseDto: AuthTokenResponseDto;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useFactory: mockAuthService }],
    }).compile();

    authController = module.get(AuthController);

    authService = module.get(AuthService);

    mockUser = UserFactory.build();

    mockAuthSignUpDto = AuthSignUpDtoFactory.build();
    mockAuthLogInDto = AuthLoginDtoFactory.build();
    mockAuthTokenResponseDto = AuthTokenResponseDtoFactory.build(mockUser);
  });

  describe('signUp', () => {
    it('calls the controller to create a new user. -> OK', async () => {
      const result = await authController.signUp(mockAuthSignUpDto);
      expect(result).toBeUndefined();
    });
  });

  describe('logIn', () => {
    it('calls the controller to log in with a user. -> OK', async () => {
      authService.logIn.mockResolvedValue(mockAuthTokenResponseDto);
      const result = await authController.logIn(mockAuthLogInDto);
      expect(result).toEqual(mockAuthTokenResponseDto);
    });
  });
});
