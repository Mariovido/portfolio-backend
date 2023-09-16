import { Repository, UpdateResult } from 'typeorm';
import { CreateBulletPointDto } from '../../src/models/dto/admin/create-bullet-point.dto';
import { UpdateBulletPointDto } from '../../src/models/dto/admin/update-bullet-point.dto';
import { BulletPointRepository } from '../../src/repositories/bullet-point.repository';
import { BulletPoint } from '../../src/repositories/entities/bullet-point.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { BulletPointFactory } from '../factories/repositories/entities/bullet-point.entity.factory';
import { CreateBulletPointDtoFactory } from '../factories/models/dto/admin/create-bullet-point.dto.factory';
import { UpdateBulletPointDtoFactory } from '../factories/models/dto/admin/update-bullet-point.dto.factory';
import { UpdateResultFactory } from '../factories/database/update-result.factory';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from '../../src/repositories/entities/user.entity';
import { Project } from '../../src/repositories/entities/project.entity';
import { ProjectFactory } from '../factories/repositories/entities/project.entity.factory';
import { WorkExperienceFactory } from '../factories/repositories/entities/work-experience.entity.factory';
import { WorkExperience } from '../../src/repositories/entities/work-experience.entity';

describe('BulletPointRepository', () => {
  let bulletPointRepository: BulletPointRepository;

  let mockBulletPointRepository: Repository<BulletPointRepository>;

  let mockUser: User;
  let mockProjectList: Project[];
  let mockWorkExperienceList: WorkExperience[];
  let mockBulletPoint: BulletPoint;
  let mockBulletPointList: BulletPoint[];

  let mockCreateBulletPointDto: CreateBulletPointDto;
  let mockUpdateBulletPointDto: UpdateBulletPointDto;

  let mockUpdateResult: UpdateResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BulletPointRepository],
      providers: [
        {
          provide: getRepositoryToken(BulletPoint),
          useClass: Repository,
        },
      ],
    }).compile();

    bulletPointRepository = module.get(BulletPointRepository);

    mockBulletPointRepository = module.get(getRepositoryToken(BulletPoint));

    mockUser = UserFactory.build();
    mockProjectList = ProjectFactory.buildList(1);
    mockWorkExperienceList = WorkExperienceFactory.buildList(1);
    mockBulletPoint = BulletPointFactory.build(true);
    mockBulletPointList = BulletPointFactory.buildList(2, false);

    mockCreateBulletPointDto = CreateBulletPointDtoFactory.build(true);
    mockUpdateBulletPointDto = UpdateBulletPointDtoFactory.build();

    mockUpdateResult = UpdateResultFactory.build({ raw: [mockBulletPoint] });
  });

  describe('findBulletPointByProjects', () => {
    it('gets a bullet point with projects', async () => {
      mockBulletPointRepository.find = jest
        .fn()
        .mockResolvedValue(mockBulletPointList);
      const result =
        await bulletPointRepository.findBulletPointByProjects(mockProjectList);
      expect(result).toEqual(mockBulletPointList);
    });
  });

  describe('findBulletPointByWorkExperiences', () => {
    it('gets a bullet point with work experiences', async () => {
      mockBulletPointRepository.find = jest
        .fn()
        .mockResolvedValue(mockBulletPointList);
      const result =
        await bulletPointRepository.findBulletPointByWorkExperiences(
          mockWorkExperienceList,
        );
      expect(result).toEqual(mockBulletPointList);
    });
  });

  describe('createBulletPoint', () => {
    it('creates a bullet point with work experience', async () => {
      mockBulletPointRepository.create = jest
        .fn()
        .mockResolvedValue(mockBulletPoint);
      mockBulletPointRepository.save = jest
        .fn()
        .mockResolvedValue(mockBulletPoint);
      const result = await bulletPointRepository.createBulletPoint(
        mockUser.id,
        mockCreateBulletPointDto,
      );
      expect(result).toEqual(mockBulletPoint);
    });
    it('creates a bullet point with project', async () => {
      mockCreateBulletPointDto = CreateBulletPointDtoFactory.build(false);
      mockBulletPointRepository.create = jest
        .fn()
        .mockResolvedValue(mockBulletPoint);
      mockBulletPointRepository.save = jest
        .fn()
        .mockResolvedValue(mockBulletPoint);
      const result = await bulletPointRepository.createBulletPoint(
        mockUser.id,
        mockCreateBulletPointDto,
      );
      expect(result).toEqual(mockBulletPoint);
    });
  });

  describe('updateBulletPoint', () => {
    it('update a bullet point with work experience', async () => {
      mockBulletPoint = {
        ...mockBulletPoint,
        workExperienceId: 'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
        workExperience: {
          id: 'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
        },
      } as any;
      mockUpdateResult = UpdateResultFactory.build({ raw: [mockBulletPoint] });
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockBulletPointRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await bulletPointRepository.updateBulletPoint(
        mockBulletPoint,
        mockUpdateBulletPointDto,
      );
      expect(result).toEqual(mockBulletPoint);
    });
    it('update a bullet point with project', async () => {
      mockBulletPoint = BulletPointFactory.build(false);
      mockBulletPoint = {
        ...mockBulletPoint,
        projectId: 'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
        project: {
          id: 'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
        },
      } as any;
      mockUpdateResult = UpdateResultFactory.build({ raw: [mockBulletPoint] });
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockBulletPointRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await bulletPointRepository.updateBulletPoint(
        mockBulletPoint,
        mockUpdateBulletPointDto,
      );
      expect(result).toEqual(mockBulletPoint);
    });
    it('update a bullet point but some error happened and returns an exception', async () => {
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
        .spyOn(mockBulletPointRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = async () => {
        await bulletPointRepository.updateBulletPoint(
          mockBulletPoint,
          mockUpdateBulletPointDto,
        );
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
