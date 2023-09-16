import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Test } from '@nestjs/testing';
import { User } from '../../src/repositories/entities/user.entity';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { SkillRepository } from '../../src/repositories/skill.repository';
import { Skill } from '../../src/repositories/entities/skill.entity';
import { SkillFactory } from '../factories/repositories/entities/skill.entity.factory';
import { CreateSkillDto } from '../../src/models/dto/admin/create-skill.dto';
import { UpdateSkillDto } from '../../src/models/dto/admin/update-skill.dto';
import { CreateSkillDtoFactory } from '../factories/models/dto/admin/create-skill.dto.factory';
import { UpdateSkillDtoFactory } from '../factories/models/dto/admin/update-skill.dto.factory';
import { UpdateResultFactory } from '../factories/database/update-result.factory';
import { InternalServerErrorException } from '@nestjs/common';

describe('SkillRepository', () => {
  let skillRepository: SkillRepository;

  let mockSkillRepository: Repository<SkillRepository>;

  let mockUser: User;
  let mockSkill: Skill;
  let mockSkillList: Skill[];

  let mockCreateSkillDto: CreateSkillDto;
  let mockUpdateSkillDto: UpdateSkillDto;

  let mockUpdateResult: UpdateResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [SkillRepository],
      providers: [
        {
          provide: getRepositoryToken(Skill),
          useClass: Repository,
        },
      ],
    }).compile();

    skillRepository = module.get(SkillRepository);

    mockSkillRepository = module.get(getRepositoryToken(Skill));

    mockUser = UserFactory.build();
    mockSkill = SkillFactory.build();
    mockSkillList = SkillFactory.buildList(2);

    mockCreateSkillDto = CreateSkillDtoFactory.build();
    mockUpdateSkillDto = UpdateSkillDtoFactory.build();

    mockUpdateResult = UpdateResultFactory.build({ raw: [mockSkill] });
  });

  describe('findSkillsByUserId', () => {
    it('skill exists on the database for the user ID', async () => {
      mockSkillRepository.find = jest.fn().mockResolvedValue(mockSkillList);
      const result = await skillRepository.findSkillsByUserId(mockUser.id);
      expect(result).toEqual(mockSkillList);
    });

    it('skill does not exist on the database for the user ID', async () => {
      mockSkillRepository.find = jest.fn().mockResolvedValue([]);
      const result = await skillRepository.findSkillsByUserId(mockUser.id);
      expect(result).toEqual([]);
    });
  });

  describe('createSkill', () => {
    it('creates a skill', async () => {
      mockSkillRepository.create = jest.fn().mockResolvedValue(mockSkill);
      mockSkillRepository.save = jest.fn().mockResolvedValue(mockSkill);
      const result = await skillRepository.createSkill(
        mockUser.id,
        mockCreateSkillDto,
      );
      expect(result).toEqual(mockSkill);
    });
  });

  describe('updateSkill', () => {
    it('update a skill', async () => {
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockSkillRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await skillRepository.updateSkill(
        mockSkill,
        mockUpdateSkillDto,
      );
      expect(result).toEqual(mockSkill);
    });
    it('update a skill but some error happened and returns an exception', async () => {
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
        .spyOn(mockSkillRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = async () => {
        await skillRepository.updateSkill(mockSkill, mockUpdateSkillDto);
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
