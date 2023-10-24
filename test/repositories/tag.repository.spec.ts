import { Repository, UpdateResult } from 'typeorm';
import { TagRepository } from '../../src/repositories/tag.repository';
import { User } from '../../src/repositories/entities/user.entity';
import { CreateTagDto } from '../../src/models/dto/admin/create-tag.dto';
import { UpdateTagDto } from '../../src/models/dto/admin/update-tag.dto';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { CreateTagDtoFactory } from '../factories/models/dto/admin/create-tag.dto.factory';
import { UpdateTagDtoFactory } from '../factories/models/dto/admin/update-tag.dto.factory';
import { UpdateResultFactory } from '../factories/database/update-result.factory';
import { InternalServerErrorException } from '@nestjs/common';
import { Tag } from '../../src/repositories/entities/tag.entity';
import { TagFactory } from '../factories/repositories/entities/tag.entity.factory';
import { WorkExperienceFactory } from '../factories/repositories/entities/work-experience.entity.factory';
import { WorkExperience } from '../../src/repositories/entities/work-experience.entity';

describe('TagRepository', () => {
  let tagRepository: TagRepository;

  let mockTagRepository: Repository<TagRepository>;

  let mockUser: User;
  let mockWorkExperienceList: WorkExperience[];
  let mockTag: Tag;
  let mockTagList: Tag[];

  let mockCreateTagDto: CreateTagDto;
  let mockUpdateTagDto: UpdateTagDto;

  let mockUpdateResult: UpdateResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TagRepository],
      providers: [
        {
          provide: getRepositoryToken(Tag),
          useClass: Repository,
        },
      ],
    }).compile();

    tagRepository = module.get(TagRepository);

    mockTagRepository = module.get(getRepositoryToken(Tag));

    mockUser = UserFactory.build();
    mockWorkExperienceList = WorkExperienceFactory.buildList(1);
    mockTag = TagFactory.build();
    mockTagList = TagFactory.buildList(2);

    mockCreateTagDto = CreateTagDtoFactory.build();
    mockUpdateTagDto = UpdateTagDtoFactory.build();

    mockUpdateResult = UpdateResultFactory.build({ raw: [mockTag] });
  });

  describe('findTagByWorkExperiences', () => {
    it('get tags', async () => {
      mockTagRepository.find = jest.fn().mockResolvedValue(mockTagList);
      const result = await tagRepository.findTagByWorkExperiences(
        mockWorkExperienceList,
      );
      expect(result).toEqual(mockTagList);
    });
  });

  describe('createTag', () => {
    it('creates a tag', async () => {
      mockTagRepository.create = jest.fn().mockResolvedValue(mockTag);
      mockTagRepository.save = jest.fn().mockResolvedValue(mockTag);
      const result = await tagRepository.createTag(
        mockUser.id,
        mockCreateTagDto,
      );
      expect(result).toEqual(mockTag);
    });
  });

  describe('updateTag', () => {
    it('update a tag', async () => {
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockTagRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await tagRepository.updateTag(mockTag, mockUpdateTagDto);
      expect(result).toEqual(mockTag);
    });
    it('update a tag but some error happened and returns an exception', async () => {
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
        .spyOn(mockTagRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = async () => {
        await tagRepository.updateTag(mockTag, mockUpdateTagDto);
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
