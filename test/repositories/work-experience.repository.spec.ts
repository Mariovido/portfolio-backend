import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Test } from '@nestjs/testing';
import { User } from '../../src/repositories/entities/user.entity';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { WorkExperienceRepository } from '../../src/repositories/work-experience.repository';
import { WorkExperience } from '../../src/repositories/entities/work-experience.entity';
import { WorkExperienceFactory } from '../factories/repositories/entities/work-experience.entity.factory';
import { CreateWorkExperienceDto } from '../../src/models/dto/admin/create-work-experience.dto';
import { UpdateWorkExperienceDto } from '../../src/models/dto/admin/update-work-experience.dto';
import { UpdateResultFactory } from '../factories/database/update-result.factory';
import { CreateWorkExperienceDtoFactory } from '../factories/models/dto/admin/create-work-experience.dto.factory';
import { UpdateWorkExperienceDtoFactory } from '../factories/models/dto/admin/update-work-experience.dto.factory';
import { InternalServerErrorException } from '@nestjs/common';

describe('WorkExperienceRepository', () => {
  let workExperienceRepository: WorkExperienceRepository;

  let mockWorkExperienceRepository: Repository<WorkExperienceRepository>;

  let mockUser: User;
  let mockWorkExperience: WorkExperience;
  let mockWorkExperienceList: WorkExperience[];

  let mockCreateWorkExperienceDto: CreateWorkExperienceDto;
  let mockUpdateWorkExperienceDto: UpdateWorkExperienceDto;

  let mockUpdateResult: UpdateResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [WorkExperienceRepository],
      providers: [
        {
          provide: getRepositoryToken(WorkExperience),
          useClass: Repository,
        },
      ],
    }).compile();

    workExperienceRepository = module.get(WorkExperienceRepository);

    mockWorkExperienceRepository = module.get(
      getRepositoryToken(WorkExperience),
    );

    mockUser = UserFactory.build();
    mockWorkExperience = WorkExperienceFactory.build();
    mockWorkExperienceList = WorkExperienceFactory.buildList(2);

    mockCreateWorkExperienceDto = CreateWorkExperienceDtoFactory.build();
    mockUpdateWorkExperienceDto = UpdateWorkExperienceDtoFactory.build();

    mockUpdateResult = UpdateResultFactory.build({ raw: [mockWorkExperience] });
  });

  describe('findWorkExperienceByUserId', () => {
    it('work experience exists on the database for the user ID', async () => {
      mockWorkExperienceRepository.find = jest
        .fn()
        .mockResolvedValue(mockWorkExperienceList);
      const result = await workExperienceRepository.findWorkExperienceByUserId(
        mockUser.id,
      );
      expect(result).toEqual(mockWorkExperienceList);
    });

    it('work experience does not exist on the database for the user ID', async () => {
      mockWorkExperienceRepository.find = jest.fn().mockResolvedValue([]);
      const result = await workExperienceRepository.findWorkExperienceByUserId(
        mockUser.id,
      );
      expect(result).toEqual([]);
    });
  });

  describe('createWorkExperience', () => {
    it('creates a work experience', async () => {
      mockWorkExperienceRepository.create = jest
        .fn()
        .mockResolvedValue(mockWorkExperience);
      mockWorkExperienceRepository.save = jest
        .fn()
        .mockResolvedValue(mockWorkExperience);
      const result = await workExperienceRepository.createWorkExperience(
        mockUser.id,
        mockCreateWorkExperienceDto,
      );
      expect(result).toEqual(mockWorkExperience);
    });
  });

  describe('updateWorkExperience', () => {
    it('update a work experience', async () => {
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockWorkExperienceRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await workExperienceRepository.updateWorkExperience(
        mockWorkExperience,
        mockUpdateWorkExperienceDto,
      );
      expect(result).toEqual(mockWorkExperience);
    });
    it('update a work experience but some error happened and returns an exception', async () => {
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
        .spyOn(mockWorkExperienceRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = async () => {
        await workExperienceRepository.updateWorkExperience(
          mockWorkExperience,
          mockUpdateWorkExperienceDto,
        );
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
