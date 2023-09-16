import { Repository, UpdateResult } from 'typeorm';
import { InterestRepository } from '../../src/repositories/interest.repository';
import { User } from '../../src/repositories/entities/user.entity';
import { Interest } from '../../src/repositories/entities/interest.entity';
import { CreateInterestDto } from '../../src/models/dto/admin/create-interest.dto';
import { UpdateInterestDto } from '../../src/models/dto/admin/update-interest.dto';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { InterestFactory } from '../factories/repositories/entities/interest.entity.factory';
import { CreateInterestDtoFactory } from '../factories/models/dto/admin/create-interest.dto';
import { UpdateInterestDtoFactory } from '../factories/models/dto/admin/update-interest.dto.factory';
import { UpdateResultFactory } from '../factories/database/update-result.factory';
import { InternalServerErrorException } from '@nestjs/common';

describe('InterestRepository', () => {
  let interestRepository: InterestRepository;

  let mockInterestRepository: Repository<InterestRepository>;

  let mockUser: User;
  let mockInterest: Interest;
  let mockInterestList: Interest[];

  let mockCreateInterestDto: CreateInterestDto;
  let mockUpdateInterestDto: UpdateInterestDto;

  let mockUpdateResult: UpdateResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [InterestRepository],
      providers: [
        {
          provide: getRepositoryToken(Interest),
          useClass: Repository,
        },
      ],
    }).compile();

    interestRepository = module.get(InterestRepository);

    mockInterestRepository = module.get(getRepositoryToken(Interest));

    mockUser = UserFactory.build();
    mockInterest = InterestFactory.build();
    mockInterestList = InterestFactory.buildList(2);

    mockCreateInterestDto = CreateInterestDtoFactory.build();
    mockUpdateInterestDto = UpdateInterestDtoFactory.build();

    mockUpdateResult = UpdateResultFactory.build({ raw: [mockInterest] });
  });

  describe('findInterestByUserId', () => {
    it('get interests', async () => {
      mockInterestRepository.find = jest
        .fn()
        .mockResolvedValue(mockInterestList);
      const result = await interestRepository.findInterestByUserId(mockUser.id);
      expect(result).toEqual(mockInterestList);
    });
  });

  describe('createInterest', () => {
    it('creates a interest', async () => {
      mockInterestRepository.create = jest.fn().mockResolvedValue(mockInterest);
      mockInterestRepository.save = jest.fn().mockResolvedValue(mockInterest);
      const result = await interestRepository.createInterest(
        mockUser.id,
        mockCreateInterestDto,
      );
      expect(result).toEqual(mockInterest);
    });
  });

  describe('updateInterest', () => {
    it('update an interest', async () => {
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockInterestRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await interestRepository.updateInterest(
        mockInterest,
        mockUpdateInterestDto,
      );
      expect(result).toEqual(mockInterest);
    });
    it('update an interest but some error happened and returns an exception', async () => {
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
        .spyOn(mockInterestRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = async () => {
        await interestRepository.updateInterest(
          mockInterest,
          mockUpdateInterestDto,
        );
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
