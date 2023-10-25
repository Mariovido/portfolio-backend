import { Repository, UpdateResult } from 'typeorm';
import { CreateLinkDto } from '../../src/models/dto/admin/create-link.dto';
import { UpdateLinkDto } from '../../src/models/dto/admin/update-link.dto';
import { User } from '../../src/repositories/entities/user.entity';
import { LinkRepository } from '../../src/repositories/link.repository';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { UpdateResultFactory } from '../factories/database/update-result.factory';
import { CreateLinkDtoFactory } from '../factories/models/dto/admin/create-link.dto.factory';
import { UpdateLinkDtoFactory } from '../factories/models/dto/admin/update-link.dto.factory';
import { InternalServerErrorException } from '@nestjs/common';
import { Link } from '../../src/repositories/entities/link.entity';
import { LinkFactory } from '../factories/repositories/entities/link.entity.factory';
import { Paragraph } from '../../src/repositories/entities/paragraph.entity';
import { WorkExperience } from '../../src/repositories/entities/work-experience.entity';
import { Contact } from '../../src/repositories/entities/contact.entity';
import { ParagraphFactory } from '../factories/repositories/entities/paragraph.entity.factory';
import { WorkExperienceFactory } from '../factories/repositories/entities/work-experience.entity.factory';
import { ContactFactory } from '../factories/repositories/entities/contact.entity.factory';

describe('LinkRepository', () => {
  let linkRepository: LinkRepository;

  let mockLinkRepository: Repository<LinkRepository>;

  let mockUser: User;
  let mockLink: Link;
  let mockLinkList: Link[];
  let mockParagraphsList: Paragraph[];
  let mockWorkExperiencesList: WorkExperience[];
  let mockContact: Contact;

  let mockCreateLinkDto: CreateLinkDto;
  let mockUpdateLinkDto: UpdateLinkDto;

  let mockUpdateResult: UpdateResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [LinkRepository],
      providers: [
        {
          provide: getRepositoryToken(Link),
          useClass: Repository,
        },
      ],
    }).compile();

    linkRepository = module.get(LinkRepository);

    mockLinkRepository = module.get(getRepositoryToken(Link));

    mockUser = UserFactory.build();
    mockLink = LinkFactory.build({ isParagraph: true });
    mockLinkList = LinkFactory.buildList(2, { isParagraph: true });
    mockParagraphsList = ParagraphFactory.buildList(1, false);
    mockWorkExperiencesList = WorkExperienceFactory.buildList(1);
    mockContact = ContactFactory.build();

    mockCreateLinkDto = CreateLinkDtoFactory.build({ isParagraph: true });
    mockUpdateLinkDto = UpdateLinkDtoFactory.build();

    mockUpdateResult = UpdateResultFactory.build({ raw: [mockLink] });
  });

  describe('findLinksByParagraphs', () => {
    it('gets the links', async () => {
      mockLinkRepository.find = jest.fn().mockResolvedValue(mockLinkList);
      const result =
        await linkRepository.findLinksByParagraphs(mockParagraphsList);
      expect(result).toEqual(mockLinkList);
    });
  });

  describe('findLinksByWorkExperiences', () => {
    it('gets the links', async () => {
      mockLinkRepository.find = jest.fn().mockResolvedValue(mockLinkList);
      const result = await linkRepository.findLinksByWorkExperiences(
        mockWorkExperiencesList,
      );
      expect(result).toEqual(mockLinkList);
    });
  });

  describe('findLinksByContacts', () => {
    it('gets the links', async () => {
      mockLinkRepository.find = jest.fn().mockResolvedValue(mockLinkList);
      const result = await linkRepository.findLinksByContacts(mockContact);
      expect(result).toEqual(mockLinkList);
    });
  });

  describe('createLink', () => {
    it('creates a link with paragraph', async () => {
      mockLinkRepository.create = jest.fn().mockResolvedValue(mockLink);
      mockLinkRepository.save = jest.fn().mockResolvedValue(mockLink);
      const result = await linkRepository.createLink(
        mockUser.id,
        mockCreateLinkDto,
      );
      expect(result).toEqual(mockLink);
    });
    it('creates a link with work experience', async () => {
      mockCreateLinkDto = CreateLinkDtoFactory.build({
        isWorkExperience: true,
      });
      mockLinkRepository.create = jest.fn().mockResolvedValue(mockLink);
      mockLinkRepository.save = jest.fn().mockResolvedValue(mockLink);
      const result = await linkRepository.createLink(
        mockUser.id,
        mockCreateLinkDto,
      );
      expect(result).toEqual(mockLink);
    });
    it('creates a link with contact', async () => {
      mockCreateLinkDto = CreateLinkDtoFactory.build({
        isContact: true,
      });
      mockLinkRepository.create = jest.fn().mockResolvedValue(mockLink);
      mockLinkRepository.save = jest.fn().mockResolvedValue(mockLink);
      const result = await linkRepository.createLink(
        mockUser.id,
        mockCreateLinkDto,
      );
      expect(result).toEqual(mockLink);
    });
  });

  describe('updateLink', () => {
    it('update a link with paragraph', async () => {
      mockLink = {
        ...mockLink,
        paragraphId: 'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
        paragraph: {
          id: 'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
        },
      } as any;
      mockUpdateResult = UpdateResultFactory.build({ raw: [mockLink] });
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockLinkRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await linkRepository.updateLink(
        mockLink,
        mockUpdateLinkDto,
      );
      expect(result).toEqual(mockLink);
    });
    it('update a link with workExperience', async () => {
      mockLink = LinkFactory.build({
        isWorkExperience: true,
      });
      mockLink = {
        ...mockLink,
        workExperienceId: 'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
        workExperience: {
          id: 'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
        },
      } as any;
      mockUpdateResult = UpdateResultFactory.build({ raw: [mockLink] });
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockLinkRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await linkRepository.updateLink(
        mockLink,
        mockUpdateLinkDto,
      );
      expect(result).toEqual(mockLink);
    });
    it('update a link with contact', async () => {
      mockLink = LinkFactory.build({
        isContact: true,
      });
      mockLink = {
        ...mockLink,
        contactId: 'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
        contact: {
          id: 'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
        },
      } as any;
      mockUpdateResult = UpdateResultFactory.build({ raw: [mockLink] });
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockLinkRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await linkRepository.updateLink(
        mockLink,
        mockUpdateLinkDto,
      );
      expect(result).toEqual(mockLink);
    });
    it('update a link but some error happened and returns an exception', async () => {
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
        .spyOn(mockLinkRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = async () => {
        await linkRepository.updateLink(mockLink, mockUpdateLinkDto);
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
