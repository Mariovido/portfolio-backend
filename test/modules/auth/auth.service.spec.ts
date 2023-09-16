import { Test } from '@nestjs/testing';
import { AuthSignUpDto } from '../../../src/models/dto/auth/auth-signup.dto';
import { AuthService } from '../../../src/modules/auth/auth.service';
import { User } from '../../../src/repositories/entities/user.entity';
import { UserRepository } from '../../../src/repositories/user.repository';
import { AuthLoginDtoFactory } from '../../factories/models/dto/auth/auth-login.dto.factory';
import { AuthSignUpDtoFactory } from '../../factories/models/dto/auth/auth-signup.dto.factory';
import { AuthTokenResponseDtoFactory } from '../../factories/models/dto/auth/auth-token-response.dto';
import { UserFactory } from '../../factories/repositories/entities/user.entity.factory';
import { mockUserRepository } from '../../factories/repositories/user.repository.factory';
import { UnauthorizedException } from '@nestjs/common';
import { AuthTokenResponseDto } from '../../../src/models/dto/auth/auth-token-response.dto';
import { AuthLogInDto } from '../../../src/models/dto/auth/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { mockJwtService } from '../../factories/services/jwt.service.factory';
import { genSalt, hash } from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;

  let userRepository: jest.Mocked<UserRepository>;

  let mockUser: User;

  let mockAuthSignUpDto: AuthSignUpDto;
  let mockAuthLogInDto: AuthLogInDto;
  let mockAuthTokenResponseDto: AuthTokenResponseDto;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    authService = module.get(AuthService);

    userRepository = module.get(UserRepository);

    mockUser = UserFactory.build();

    mockAuthSignUpDto = AuthSignUpDtoFactory.build();
    mockAuthLogInDto = AuthLoginDtoFactory.build();
    mockAuthTokenResponseDto = AuthTokenResponseDtoFactory.build(mockUser);
  });

  describe('signUp', () => {
    it('calls the service to create a new user. -> OK', async () => {
      userRepository.createUser.mockResolvedValue(mockUser);
      const result = await authService.signUp(mockAuthSignUpDto);
      expect(result).toBeUndefined();
    });
  });

  describe('logIn', () => {
    it('calls the service to log in a user. -> OK', async () => {
      userRepository.findOneBy.mockResolvedValue(mockUser);

      const salt = await genSalt();
      const hashedPassword = await hash('Abc1234*', salt);

      mockUser.password = hashedPassword;
      const result = await authService.logIn(mockAuthLogInDto);
      expect(result).toEqual(mockAuthTokenResponseDto);
    });
    it('calls the service to log in a user but the user is not found. -> KO', async () => {
      userRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await authService.logIn(mockAuthLogInDto);
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to log in a user but the passwords does not match. -> KO', async () => {
      userRepository.findOneBy.mockResolvedValue(mockUser);
      const result = async () => {
        await authService.logIn(mockAuthLogInDto);
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });
});
