import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Test } from '@nestjs/testing';
import { User } from '../../src/repositories/entities/user.entity';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { EducationRepository } from '../../src/repositories/education.repository';
import { Education } from '../../src/repositories/entities/education.entity';
import { EducationFactory } from '../factories/repositories/entities/education.entity.factory';
import { CreateEducationDto } from '../../src/models/dto/admin/create-education.dto';
import { CreateEducationDtoFactory } from '../factories/models/dto/admin/create-education.dto.factory';
import { UpdateResultFactory } from '../factories/database/update-result.factory';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateEducationDtoFactory } from '../factories/models/dto/admin/update-education.dto.factory';
import { UpdateEducationDto } from '../../src/models/dto/admin/update-education.dto';

describe('EducationRepository', () => {
  let educationRepository: EducationRepository;

  let mockEducationRepository: Repository<EducationRepository>;

  let mockUser: User;
  let mockEducation: Education;
  let mockEducationList: Education[];

  let mockCreateEducationDto: CreateEducationDto;
  let mockUpdateEducationDto: UpdateEducationDto;

  let mockUpdateResult: UpdateResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [EducationRepository],
      providers: [
        {
          provide: getRepositoryToken(Education),
          useClass: Repository,
        },
      ],
    }).compile();

    educationRepository = module.get(EducationRepository);

    mockEducationRepository = module.get(getRepositoryToken(Education));

    mockUser = UserFactory.build();
    mockEducation = EducationFactory.build();
    mockEducationList = EducationFactory.buildList(2);

    mockCreateEducationDto = CreateEducationDtoFactory.build();
    mockUpdateEducationDto = UpdateEducationDtoFactory.build();

    mockUpdateResult = UpdateResultFactory.build({ raw: [mockEducation] });
  });

  describe('findEducationByUserId', () => {
    it('education exists on the database for the user ID', async () => {
      mockEducationRepository.find = jest
        .fn()
        .mockResolvedValue(mockEducationList);
      const result = await educationRepository.findEducationByUserId(
        mockUser.id,
      );
      expect(result).toEqual(mockEducationList);
    });

    it('education does not exist on the database for the user ID', async () => {
      mockEducationRepository.find = jest.fn().mockResolvedValue([]);
      const result = await educationRepository.findEducationByUserId(
        mockUser.id,
      );
      expect(result).toEqual([]);
    });
  });

  describe('createEducation', () => {
    it('creates a new education', async () => {
      mockEducationRepository.create = jest
        .fn()
        .mockResolvedValue(mockEducation);
      mockEducationRepository.save = jest.fn().mockResolvedValue(mockEducation);
      const result = await educationRepository.createEducation(
        mockUser.id,
        mockCreateEducationDto,
      );
      expect(result).toEqual(mockEducation);
    });
  });

  describe('updateEducation', () => {
    it('update an education', async () => {
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockEducationRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await educationRepository.updateEducation(
        mockEducation,
        mockUpdateEducationDto,
      );
      expect(result).toEqual(mockEducation);
    });
    it('update an education but some error happened and returns an exception', async () => {
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
        .spyOn(mockEducationRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = async () => {
        await educationRepository.updateEducation(
          mockEducation,
          mockUpdateEducationDto,
        );
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
