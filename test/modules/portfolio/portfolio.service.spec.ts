import { Test } from '@nestjs/testing';
import { PortfolioService } from '../../../src/modules/portfolio/portfolio.service';
import { UserFactory } from '../../factories/repositories/entities/user.entity.factory';
import { User } from '../../../src/repositories/entities/user.entity';
import { UserRepository } from '../../../src/repositories/user.repository';
import { mockUserRepository } from '../../factories/repositories/user.repository.factory';
import { PersonalInformationDto } from '../../../src/models/dto/portfolio/personal-information.dto';
import { PersonalInformationDtoFactory } from '../../factories/models/dto/portfolio/personal-information.dto.factory';
import { EducationRepository } from '../../../src/repositories/education.repository';
import { WorkExperienceRepository } from '../../../src/repositories/work-experience.repository';
import { SkillRepository } from '../../../src/repositories/skill.repository';
import { ProjectRepository } from '../../../src/repositories/project.repository';
import { ContactRepository } from '../../../src/repositories/contact.repository';
import { mockEducationRepository } from '../../factories/repositories/education.repository.factory';
import { mockWorkExperienceRepository } from '../../factories/repositories/work-experience.repository.factory';
import { mockSkillRepository } from '../../factories/repositories/skill.repository.factory';
import { mockProjectRepository } from '../../factories/repositories/project.repository.factory';
import { mockContactRepository } from '../../factories/repositories/contact.repository.factory';
import { NotFoundException } from '@nestjs/common';
import { Education } from '../../../src/repositories/entities/education.entity';
import { EducationFactory } from '../../factories/repositories/entities/education.entity.factory';
import { EducationPortfolioDto } from '../../../src/models/dto/portfolio/education-portfolio.dto';
import { EducationPortfolioDtoFactory } from '../../factories/models/dto/portfolio/education-portofolio.dto.factory';
import { WorkExperience } from '../../../src/repositories/entities/work-experience.entity';
import { WorkExperiencePortfolioDto } from '../../../src/models/dto/portfolio/work-experience.dto';
import { WorkExperienceFactory } from '../../factories/repositories/entities/work-experience.entity.factory';
import { WorkExperiencePortfolioDtoFactory } from '../../factories/models/dto/portfolio/work-experience.dto.factory';
import { Skill } from '../../../src/repositories/entities/skill.entity';
import { SkillFactory } from '../../factories/repositories/entities/skill.entity.factory';
import { SkillPortfolioDtoFactory } from '../../factories/models/dto/portfolio/skill.dto.factory';
import { SkillPortfolioDto } from '../../../src/models/dto/portfolio/skill-portfolio.dto';
import { ProjectPortfolioDto } from '../../../src/models/dto/portfolio/project-portfolio.dto';
import { ProjectFactory } from '../../factories/repositories/entities/project.entity.factory';
import { ProjectPortfolioDtoFactory } from '../../factories/models/dto/portfolio/project.dto.factory';
import { Project } from '../../../src/repositories/entities/project.entity';
import { Contact } from '../../../src/repositories/entities/contact.entity';
import { ContactPortfolioDto } from '../../../src/models/dto/portfolio/contact-portfolio.dto';
import { ContactFactory } from '../../factories/repositories/entities/contact.entity.factory';
import { ContactPortfolioDtoFactory } from '../../factories/models/dto/portfolio/contact.dto.factory';
import { BannerDto } from '../../../src/models/dto/portfolio/banner.dto';
import { BannerDtoFactory } from '../../factories/models/dto/portfolio/banner.dto.factory';

describe('PortfolioService', () => {
  let portfolioService: PortfolioService;

  let userRepository: jest.Mocked<UserRepository>;
  let educationRepository: jest.Mocked<EducationRepository>;
  let workExperienceRepository: jest.Mocked<WorkExperienceRepository>;
  let skillRepository: jest.Mocked<SkillRepository>;
  let projectRepository: jest.Mocked<ProjectRepository>;
  let contactRepository: jest.Mocked<ContactRepository>;

  let mockUser: User;
  let mockEducationList: Education[];
  let mockWorkExperienceList: WorkExperience[];
  let mockSkillList: Skill[];
  let mockProjectList: Project[];
  let mockContact: Contact;

  let mockPersonalInformationDto: PersonalInformationDto;
  let mockEducationPortfolioDtoList: EducationPortfolioDto[];
  let mockWorkExperiencePortfolioDtoList: WorkExperiencePortfolioDto[];
  let mockSkillPortfolioDtoList: SkillPortfolioDto[];
  let mockProjectPortfolioDtoList: ProjectPortfolioDto[];
  let mockContactPortfolioDto: ContactPortfolioDto;
  let mockBannerDto: BannerDto;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PortfolioService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: EducationRepository, useFactory: mockEducationRepository },
        {
          provide: WorkExperienceRepository,
          useFactory: mockWorkExperienceRepository,
        },
        { provide: SkillRepository, useFactory: mockSkillRepository },
        { provide: ProjectRepository, useFactory: mockProjectRepository },
        { provide: ContactRepository, useFactory: mockContactRepository },
      ],
    }).compile();

    portfolioService = module.get(PortfolioService);

    userRepository = module.get(UserRepository);
    educationRepository = module.get(EducationRepository);
    workExperienceRepository = module.get(WorkExperienceRepository);
    skillRepository = module.get(SkillRepository);
    projectRepository = module.get(ProjectRepository);
    contactRepository = module.get(ContactRepository);

    mockUser = UserFactory.build();
    mockEducationList = EducationFactory.buildList(2);
    mockWorkExperienceList = WorkExperienceFactory.buildList(2);
    mockSkillList = SkillFactory.buildList(2);
    mockProjectList = ProjectFactory.buildList(2);
    mockContact = ContactFactory.build();

    mockPersonalInformationDto = PersonalInformationDtoFactory.build(mockUser);
    mockEducationPortfolioDtoList =
      EducationPortfolioDtoFactory.buildListByEducationList(mockEducationList);
    mockWorkExperiencePortfolioDtoList =
      WorkExperiencePortfolioDtoFactory.buildListByWorkExperienceList(
        mockWorkExperienceList,
      );
    mockSkillPortfolioDtoList =
      SkillPortfolioDtoFactory.buildListBySkillList(mockSkillList);
    mockProjectPortfolioDtoList =
      ProjectPortfolioDtoFactory.buildListByProjectList(mockProjectList);
    mockContactPortfolioDto = ContactPortfolioDtoFactory.build(mockContact);
    mockBannerDto = BannerDtoFactory.build(mockUser);
  });

  describe('getPersonalInformation', () => {
    it('calls the service to return all the personal information. -> OK', async () => {
      userRepository.findOneBy.mockResolvedValue(mockUser);
      const result = await portfolioService.getPersonalInformation(mockUser.id);
      expect(result).toEqual(mockPersonalInformationDto);
    });

    it('calls the service with an invalid id to return an exception. -> KO', async () => {
      userRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await portfolioService.getPersonalInformation(mockUser.id);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getEducation', () => {
    it('calls the service to return the educations from a user. -> OK', async () => {
      educationRepository.findEducationByUserId.mockResolvedValue(
        mockEducationList,
      );
      const result = await portfolioService.getEducation(mockUser.id);
      expect(result).toEqual(mockEducationPortfolioDtoList);
    });
    it('calls the service with an invalid ID to return an exception. -> KO', async () => {
      educationRepository.findEducationByUserId.mockResolvedValue([]);
      const result = async () => {
        await portfolioService.getEducation(mockUser.id);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getWorkExperience', () => {
    it('calls the service to return the work experiences from a user. -> OK', async () => {
      workExperienceRepository.findWorkExperienceByUserId.mockResolvedValue(
        mockWorkExperienceList,
      );
      const result = await portfolioService.getWorkExperience(mockUser.id);
      expect(result).toEqual(mockWorkExperiencePortfolioDtoList);
    });
    it('calls the service with an invalid ID to return an exception. -> KO', async () => {
      workExperienceRepository.findWorkExperienceByUserId.mockResolvedValue([]);
      const result = async () => {
        await portfolioService.getWorkExperience(mockUser.id);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getSkills', () => {
    it('calls the service to return the skills from a user. -> OK', async () => {
      skillRepository.findSkillsByUserId.mockResolvedValue(mockSkillList);
      const result = await portfolioService.getSkills(mockUser.id);
      expect(result).toEqual(mockSkillPortfolioDtoList);
    });
    it('calls the service with an invalid ID to return an exception. -> KO', async () => {
      skillRepository.findSkillsByUserId.mockResolvedValue([]);
      const result = async () => {
        await portfolioService.getSkills(mockUser.id);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getProjects', () => {
    it('calls the service to return the projects from a user. -> OK', async () => {
      projectRepository.findProjectsByUserId.mockResolvedValue(mockProjectList);
      const result = await portfolioService.getProjects(mockUser.id);
      expect(result).toEqual(mockProjectPortfolioDtoList);
    });
    it('calls the service with an invalid ID to return an exception. -> KO', async () => {
      projectRepository.findProjectsByUserId.mockResolvedValue([]);
      const result = async () => {
        await portfolioService.getProjects(mockUser.id);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getContacts', () => {
    it('calls the service to return the contacts from a user. -> OK', async () => {
      contactRepository.findContactsByUserId.mockResolvedValue(mockContact);
      const result = await portfolioService.getContacts(mockUser.id);
      expect(result).toEqual(mockContactPortfolioDto);
    });
    it('calls the service with an invalid ID to return an exception. -> KO', async () => {
      contactRepository.findContactsByUserId.mockResolvedValue(null);
      const result = async () => {
        await portfolioService.getContacts(mockUser.id);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getBanner', () => {
    it('calls the service to return the banner from a user. -> OK', async () => {
      userRepository.findOneBy.mockResolvedValue(mockUser);
      const result = await portfolioService.getBanner(mockUser.id);
      expect(result).toEqual(mockBannerDto);
    });
    it('calls the service with an invalid ID to return an exception. -> KO', async () => {
      userRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await portfolioService.getBanner(mockUser.id);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
