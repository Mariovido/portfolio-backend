import { Repository, UpdateResult } from 'typeorm';
import { CreateTechnologyDto } from '../../src/models/dto/admin/create-technology.dto';
import { UpdateTechnologyDto } from '../../src/models/dto/admin/update-technology.dto';
import { Technology } from '../../src/repositories/entities/technology.entity';
import { User } from '../../src/repositories/entities/user.entity';
import { TechnologyRepository } from '../../src/repositories/technology.repository';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { TechnologyFactory } from '../factories/repositories/entities/technology.entity.factory';
import { UpdateResultFactory } from '../factories/database/update-result.factory';
import { CreateTechnologyDtoFactory } from '../factories/models/dto/admin/create-technology.dto.factory';
import { UpdateTechnologyDtoFactory } from '../factories/models/dto/admin/update-technology.dto.factory';
import { InternalServerErrorException } from '@nestjs/common';
import { ProjectFactory } from '../factories/repositories/entities/project.entity.factory';
import { Project } from '../../src/repositories/entities/project.entity';

describe('TechnologyRepository', () => {
  let technologyRepository: TechnologyRepository;

  let mockTechnologyRepository: Repository<TechnologyRepository>;

  let mockUser: User;
  let mockProjectList: Project[];
  let mockTechnology: Technology;
  let mockTechnologyList: Technology[];

  let mockCreateTechnologyDto: CreateTechnologyDto;
  let mockUpdateTechnologyDto: UpdateTechnologyDto;

  let mockUpdateResult: UpdateResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TechnologyRepository],
      providers: [
        {
          provide: getRepositoryToken(Technology),
          useClass: Repository,
        },
      ],
    }).compile();

    technologyRepository = module.get(TechnologyRepository);

    mockTechnologyRepository = module.get(getRepositoryToken(Technology));

    mockUser = UserFactory.build();
    mockProjectList = ProjectFactory.buildList(1);
    mockTechnology = TechnologyFactory.build();
    mockTechnologyList = TechnologyFactory.buildList(2);

    mockCreateTechnologyDto = CreateTechnologyDtoFactory.build();
    mockUpdateTechnologyDto = UpdateTechnologyDtoFactory.build();

    mockUpdateResult = UpdateResultFactory.build({ raw: [mockTechnology] });
  });

  describe('findTechnologyByProjects', () => {
    it('gets the technologies', async () => {
      mockTechnologyRepository.find = jest
        .fn()
        .mockResolvedValue(mockTechnologyList);
      const result =
        await technologyRepository.findTechnologyByProjects(mockProjectList);
      expect(result).toEqual(mockTechnologyList);
    });
  });

  describe('createTechnology', () => {
    it('creates a technology', async () => {
      mockTechnologyRepository.create = jest
        .fn()
        .mockResolvedValue(mockTechnology);
      mockTechnologyRepository.save = jest
        .fn()
        .mockResolvedValue(mockTechnology);
      const result = await technologyRepository.createTechnology(
        mockUser.id,
        mockCreateTechnologyDto,
      );
      expect(result).toEqual(mockTechnology);
    });
  });

  describe('updateTechnology', () => {
    it('update a technology', async () => {
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockTechnologyRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await technologyRepository.updateTechnology(
        mockTechnology,
        mockUpdateTechnologyDto,
      );
      expect(result).toEqual(mockTechnology);
    });
    it('update a technology but some error happened and returns an exception', async () => {
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
        .spyOn(mockTechnologyRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = async () => {
        await technologyRepository.updateTechnology(
          mockTechnology,
          mockUpdateTechnologyDto,
        );
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
