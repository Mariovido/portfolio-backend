import { Test } from '@nestjs/testing';
import { JwtPayload } from '../../src/models/interfaces/jwt-payload.interface';
import { UserRepository } from '../../src/repositories/user.repository';
import { JwtStrategy } from '../../src/strategies/jwt.strategy';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { mockUserRepository } from '../factories/repositories/user.repository.factory';
import { User } from '../../src/repositories/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { JwtPayloadFactory } from '../factories/models/interfaces/jwt-payload.interface.factory';
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from '../factories/services/config.service.factory';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  let userRepository: jest.Mocked<UserRepository>;

  let mockUser: User;

  let mockJwtPayload: JwtPayload;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
        {
          provide: ConfigService,
          useFactory: () => mockConfigService(),
        },
      ],
    }).compile();

    jwtStrategy = module.get(JwtStrategy);

    userRepository = module.get(UserRepository);

    mockUser = UserFactory.build();

    mockJwtPayload = JwtPayloadFactory.build(mockUser);
  });

  describe('validate', () => {
    it('calls the strategy with a valid payload to return the user. -> OK', async () => {
      userRepository.findOneBy.mockResolvedValue(mockUser);
      const result = await jwtStrategy.validate(mockJwtPayload);
      expect(result).toEqual(mockUser);
    });

    it('calls the strategy with an invalid payload to return an exception. -> KO', async () => {
      userRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await jwtStrategy.validate(mockJwtPayload);
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });
});
