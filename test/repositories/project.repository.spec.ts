import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Test } from '@nestjs/testing';
import { User } from '../../src/repositories/entities/user.entity';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { ProjectRepository } from '../../src/repositories/project.repository';
import { Project } from '../../src/repositories/entities/project.entity';
import { ProjectFactory } from '../factories/repositories/entities/project.entity.factory';
import { CreateProjectDto } from '../../src/models/dto/admin/create-project.dto';
import { UpdateProjectDto } from '../../src/models/dto/admin/update-project.dto';
import { UpdateProjectDtoFactory } from '../factories/models/dto/admin/update-project.dto.factory';
import { CreateProjectDtoFactory } from '../factories/models/dto/admin/create-project.dto.factory';
import { UpdateResultFactory } from '../factories/database/update-result.factory';
import { InternalServerErrorException } from '@nestjs/common';

// TODO - RETOCAR
describe('ProjectRepository', () => {
  let projectRepository: ProjectRepository;

  let mockProjectRepository: Repository<ProjectRepository>;

  let mockUser: User;
  let mockProject: Project;
  let mockProjectList: Project[];

  let mockCreateProjectDto: CreateProjectDto;
  let mockUpdateProjectDto: UpdateProjectDto;

  let mockUpdateResult: UpdateResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProjectRepository],
      providers: [
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
      ],
    }).compile();

    projectRepository = module.get(ProjectRepository);

    mockProjectRepository = module.get(getRepositoryToken(Project));

    mockUser = UserFactory.build();
    mockProject = ProjectFactory.build();
    mockProjectList = ProjectFactory.buildList(2);

    mockCreateProjectDto = CreateProjectDtoFactory.build();
    mockUpdateProjectDto = UpdateProjectDtoFactory.build();

    mockUpdateResult = UpdateResultFactory.build({ raw: [mockProject] });
  });

  describe('findProjectsByUserId', () => {
    it('project exists on the database for the user ID', async () => {
      mockProjectRepository.find = jest.fn().mockResolvedValue(mockProjectList);
      const result = await projectRepository.findProjectsByUserId(mockUser.id);
      expect(result).toEqual(mockProjectList);
    });

    it('project does not exist on the database for the user ID', async () => {
      mockProjectRepository.find = jest.fn().mockResolvedValue([]);
      const result = await projectRepository.findProjectsByUserId(mockUser.id);
      expect(result).toEqual([]);
    });
  });

  describe('createProject', () => {
    it('creates a project', async () => {
      mockProjectRepository.create = jest.fn().mockResolvedValue(mockProject);
      mockProjectRepository.save = jest.fn().mockResolvedValue(mockProject);
      const result = await projectRepository.createProject(
        mockUser.id,
        mockCreateProjectDto,
      );
      expect(result).toEqual(mockProject);
    });
  });

  describe('updateProject', () => {
    it('update a project', async () => {
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockProjectRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await projectRepository.updateProject(
        mockProject,
        mockUpdateProjectDto,
      );
      expect(result).toEqual(mockProject);
    });
    it('update a project but some error happened and returns an exception', async () => {
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
        .spyOn(mockProjectRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = async () => {
        await projectRepository.updateProject(
          mockProject,
          mockUpdateProjectDto,
        );
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
