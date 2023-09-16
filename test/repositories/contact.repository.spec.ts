import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Test } from '@nestjs/testing';
import { User } from '../../src/repositories/entities/user.entity';
import { ContactRepository } from '../../src/repositories/contact.repository';
import { Contact } from '../../src/repositories/entities/contact.entity';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import { ContactFactory } from '../factories/repositories/entities/contact.entity.factory';
import { CreateContactDto } from '../../src/models/dto/admin/create-contact.dto';
import { CreateContactDtoFactory } from '../factories/models/dto/admin/create-contact.dto.factory';
import { UpdateContactDto } from '../../src/models/dto/admin/update-contact.dto';
import { UpdateContactDtoFactory } from '../factories/models/dto/admin/update-contact.dto.factory';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateResultFactory } from '../factories/database/update-result.factory';

describe('ContactRepository', () => {
  let contactRepository: ContactRepository;

  let mockContactRepository: Repository<ContactRepository>;

  let mockUser: User;
  let mockContact: Contact;

  let mockCreateContactDto: CreateContactDto;
  let mockUpdateContactDto: UpdateContactDto;

  let mockUpdateResult: UpdateResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ContactRepository],
      providers: [
        {
          provide: getRepositoryToken(Contact),
          useClass: Repository,
        },
      ],
    }).compile();

    contactRepository = module.get(ContactRepository);

    mockContactRepository = module.get(getRepositoryToken(Contact));

    mockUser = UserFactory.build();
    mockContact = ContactFactory.build();

    mockCreateContactDto = CreateContactDtoFactory.build();
    mockUpdateContactDto = UpdateContactDtoFactory.build();

    mockUpdateResult = UpdateResultFactory.build({ raw: [mockContact] });
  });

  describe('findContactsByUserId', () => {
    it('a contact exists on the database for the user ID', async () => {
      mockContactRepository.findOne = jest.fn().mockResolvedValue(mockContact);
      const result = await contactRepository.findContactsByUserId(mockUser.id);
      expect(result).toEqual(mockContact);
    });
    it('a contact does not exist on the database for the user ID', async () => {
      mockContactRepository.findOne = jest.fn().mockResolvedValue([]);
      const result = await contactRepository.findContactsByUserId(mockUser.id);
      expect(result).toEqual([]);
    });
  });

  describe('createContact', () => {
    it('create a new contact', async () => {
      mockContactRepository.create = jest.fn().mockResolvedValue(mockContact);
      mockContactRepository.save = jest.fn().mockResolvedValue(mockContact);
      const result = await contactRepository.createContact(
        mockUser.id,
        mockCreateContactDto,
      );
      expect(result).toEqual(mockContact);
    });
    it('create a new contact but the contact already exists and returns an exception', async () => {
      mockContactRepository.create = jest.fn().mockResolvedValue(mockContact);
      mockContactRepository.save = jest.fn().mockImplementation(() => {
        const error: any = new Error();
        error.code = '23505';
        throw error;
      });
      const result = async () => {
        await contactRepository.createContact(
          mockUser.id,
          mockCreateContactDto,
        );
      };
      await expect(result).rejects.toThrow(ConflictException);
    });
    it('create a new contact but some error happened and returns an exception', async () => {
      mockContactRepository.create = jest.fn().mockResolvedValue(mockContact);
      mockContactRepository.save = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      const result = async () => {
        await contactRepository.createContact(
          mockUser.id,
          mockCreateContactDto,
        );
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('updateContact', () => {
    it('update a contact', async () => {
      const updateQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockUpdateResult),
      };
      jest
        .spyOn(mockContactRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = await contactRepository.updateContact(
        mockContact,
        mockUpdateContactDto,
      );
      expect(result).toEqual(mockContact);
    });
    it('update a contact but some error happened and returns an exception', async () => {
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
        .spyOn(mockContactRepository, 'createQueryBuilder')
        .mockReturnValue(updateQueryBuilder as any);
      const result = async () => {
        await contactRepository.updateContact(
          mockContact,
          mockUpdateContactDto,
        );
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
