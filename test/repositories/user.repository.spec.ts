import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Test } from '@nestjs/testing';
import { User } from '../../src/repositories/entities/user.entity';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { UserRepository } from '../../src/repositories/user.repository';
import { AuthSignUpDto } from '../../src/models/dto/auth/auth-signup.dto';
import { AuthSignUpDtoFactory } from '../factories/models/dto/auth/auth-signup.dto.factory';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateUserDto } from '../../src/models/dto/admin/update-user.dto';
import { UpdateUserDtoFactory } from '../factories/models/dto/admin/update-user.dto.factory';
import { UpdateResultFactory } from '../factories/database/update-result.factory';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  let mockUserRepository: Repository<UserRepository>;

  let mockUser: User;

  let mockUpdateResult: UpdateResult;

  let mockAuthSignUpDto: AuthSignUpDto;
  let mockUpdateUserDto: UpdateUserDto;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserRepository],
      providers: [
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = module.get(UserRepository);

    mockUserRepository = module.get(getRepositoryToken(User));

    mockUser = UserFactory.build();

    mockUpdateResult = UpdateResultFactory.build({ raw: [mockUser] });

    mockAuthSignUpDto = AuthSignUpDtoFactory.build();
    mockUpdateUserDto = UpdateUserDtoFactory.build();
  });

  describe('createUser', () => {
    it('create a new user when signing up', async () => {
      mockUserRepository.create = jest.fn().mockResolvedValue(mockUser);
      mockUserRepository.save = jest.fn().mockResolvedValue(mockUser);
      const result = await userRepository.createUser(mockAuthSignUpDto);
      expect(result).toEqual(mockUser);
    });
    it('create a new user when signing up but the username already exists and returns an exception', async () => {
      mockUserRepository.create = jest.fn().mockResolvedValue(mockUser);
      mockUserRepository.save = jest.fn().mockImplementation(() => {
        const error: any = new Error();
        error.code = '23505';
        throw error;
      });
      const result = async () => {
        await userRepository.createUser(mockAuthSignUpDto);
      };
      await expect(result).rejects.toThrow(ConflictException);
    });
    it('create a new user when signing up but some error happened and returns an exception', async () => {
      mockUserRepository.create = jest.fn().mockResolvedValue(mockUser);
      mockUserRepository.save = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      const result = async () => {
        await userRepository.createUser(mockAuthSignUpDto);
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('updateUser', () => {
    it('update a user', async () => {
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockUserRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await userRepository.updateUser(
        mockUser,
        mockUpdateUserDto,
      );
      expect(result).toEqual(mockUser);
    });
    it('update a user but some error happened and returns an exception', async () => {
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockImplementation(() => {
          throw new Error();
        }),
      };
      jest
        .spyOn(mockUserRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = async () => {
        await userRepository.updateUser(mockUser, mockUpdateUserDto);
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
