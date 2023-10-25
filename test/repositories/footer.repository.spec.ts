import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { User } from '../../src/repositories/entities/user.entity';
import { UserFactory } from '../factories/repositories/entities/user.entity.factory';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FooterRepository } from '../../src/repositories/footer.repository';
import { Footer } from '../../src/repositories/entities/footer.entity';
import { CreateFooterDto } from '../../src/models/dto/admin/create-footer.dto';
import { FooterFactory } from '../factories/repositories/entities/footer.entity.factory';
import { CreateFooterDtoFactory } from '../factories/models/dto/admin/create-footer.dto.factory';

describe('FooterRepository', () => {
  let footerRepository: FooterRepository;

  let mockFooterRepository: Repository<FooterRepository>;

  let mockUser: User;
  let mockFooter: Footer;

  let mockCreateFooterDto: CreateFooterDto;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FooterRepository],
      providers: [
        {
          provide: getRepositoryToken(Footer),
          useClass: Repository,
        },
      ],
    }).compile();

    footerRepository = module.get(FooterRepository);

    mockFooterRepository = module.get(getRepositoryToken(Footer));

    mockUser = UserFactory.build();
    mockFooter = FooterFactory.build();

    mockCreateFooterDto = CreateFooterDtoFactory.build();
  });

  describe('findFootersByUserId', () => {
    it('a footer exists on the database for the user ID', async () => {
      mockFooterRepository.findOne = jest.fn().mockResolvedValue(mockFooter);
      const result = await footerRepository.findFootersByUserId(mockUser.id);
      expect(result).toEqual(mockFooter);
    });
    it('a footer does not exist on the database for the user ID', async () => {
      mockFooterRepository.findOne = jest.fn().mockResolvedValue([]);
      const result = await footerRepository.findFootersByUserId(mockUser.id);
      expect(result).toEqual([]);
    });
  });

  describe('createFooter', () => {
    it('create a new footer', async () => {
      mockFooterRepository.create = jest.fn().mockResolvedValue(mockFooter);
      mockFooterRepository.save = jest.fn().mockResolvedValue(mockFooter);
      const result = await footerRepository.createFooter(
        mockUser.id,
        mockCreateFooterDto,
      );
      expect(result).toEqual(mockFooter);
    });
    it('create a new footer but the footer already exists and returns an exception', async () => {
      mockFooterRepository.create = jest.fn().mockResolvedValue(mockFooter);
      mockFooterRepository.save = jest.fn().mockImplementation(() => {
        const error: any = new Error();
        error.code = '23505';
        throw error;
      });
      const result = async () => {
        await footerRepository.createFooter(mockUser.id, mockCreateFooterDto);
      };
      await expect(result).rejects.toThrow(ConflictException);
    });
    it('create a new footer but some error happened and returns an exception', async () => {
      mockFooterRepository.create = jest.fn().mockResolvedValue(mockFooter);
      mockFooterRepository.save = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      const result = async () => {
        await footerRepository.createFooter(mockUser.id, mockCreateFooterDto);
      };
      await expect(result).rejects.toThrow(InternalServerErrorException);
    });
  });
});
