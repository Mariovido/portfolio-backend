import { Test } from '@nestjs/testing';
import { PortfolioService } from '../../../src/modules/portfolio/portfolio.service';
import { UserFactory } from '../../factories/repositories/entities/user.entity.factory';
import { User } from '../../../src/repositories/entities/user.entity';
import { PersonalInformationDto } from '../../../src/models/dto/portfolio/personal-information.dto';
import { PersonalInformationDtoFactory } from '../../factories/models/dto/portfolio/personal-information.dto.factory';
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
import { PortfolioController } from '../../../src/modules/portfolio/portfolio.controller';
import { mockPortfolioService } from '../../factories/modules/portfolio/portfolio.service.factory';

describe('PortfolioController', () => {
  let portfolioController: PortfolioController;

  let portfolioService: jest.Mocked<PortfolioService>;

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
      controllers: [PortfolioController],
      providers: [
        { provide: PortfolioService, useFactory: mockPortfolioService },
      ],
    }).compile();

    portfolioController = module.get(PortfolioController);

    portfolioService = module.get(PortfolioService);

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
    it('calls the controller to return all the personal information. -> OK', async () => {
      portfolioService.getPersonalInformation.mockResolvedValue(
        mockPersonalInformationDto,
      );
      const result = await portfolioController.getPersonalInformation(
        mockUser.id,
      );
      expect(result).toEqual(mockPersonalInformationDto);
    });
  });

  describe('getEducation', () => {
    it('calls the controller to return the educations from a user. -> OK', async () => {
      portfolioService.getEducation.mockResolvedValue(
        mockEducationPortfolioDtoList,
      );
      const result = await portfolioController.getEducation(mockUser.id);
      expect(result).toEqual(mockEducationPortfolioDtoList);
    });
  });

  describe('getWorkExperience', () => {
    it('calls the controller to return the work experiences from a user. -> OK', async () => {
      portfolioService.getWorkExperience.mockResolvedValue(
        mockWorkExperiencePortfolioDtoList,
      );
      const result = await portfolioController.getWorkExperience(mockUser.id);
      expect(result).toEqual(mockWorkExperiencePortfolioDtoList);
    });
  });

  describe('getSkills', () => {
    it('calls the controller to return the skills from a user. -> OK', async () => {
      portfolioService.getSkills.mockResolvedValue(mockSkillPortfolioDtoList);
      const result = await portfolioController.getSkills(mockUser.id);
      expect(result).toEqual(mockSkillPortfolioDtoList);
    });
  });

  describe('getProjects', () => {
    it('calls the controller to return the projects from a user. -> OK', async () => {
      portfolioService.getProjects.mockResolvedValue(
        mockProjectPortfolioDtoList,
      );
      const result = await portfolioController.getProjects(mockUser.id);
      expect(result).toEqual(mockProjectPortfolioDtoList);
    });
  });

  describe('getContacts', () => {
    it('calls the controller to return the contacts from a user. -> OK', async () => {
      portfolioService.getContacts.mockResolvedValue(mockContactPortfolioDto);
      const result = await portfolioController.getContacts(mockUser.id);
      expect(result).toEqual(mockContactPortfolioDto);
    });
  });

  describe('getBanner', () => {
    it('calls the controller to return the banner from a user. -> OK', async () => {
      portfolioService.getBanner.mockResolvedValue(mockBannerDto);
      const result = await portfolioController.getBanner(mockUser.id);
      expect(result).toEqual(mockBannerDto);
    });
  });
});
