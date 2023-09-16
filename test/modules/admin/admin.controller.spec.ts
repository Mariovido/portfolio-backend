import { Test } from '@nestjs/testing';
import { AdminController } from '../../../src/modules/admin/admin.controller';
import { AdminService } from '../../../src/modules/admin/admin.service';
import { mockAdminService } from '../../factories/modules/admin/admin.service.factory';
import { UserDto } from '../../../src/models/dto/user.dto';
import { UserDtoFactory } from '../../factories/models/dto/user.dto.factory';
import { User } from '../../../src/repositories/entities/user.entity';
import { UpdateUserDto } from '../../../src/models/dto/admin/update-user.dto';
import { UserFactory } from '../../factories/repositories/entities/user.entity.factory';
import { UpdateUserDtoFactory } from '../../factories/models/dto/admin/update-user.dto.factory';
import { UserRepository } from '../../../src/repositories/user.repository';
import { mockUserRepository } from '../../factories/repositories/user.repository.factory';
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from '../../factories/services/config.service.factory';
import { JwtService } from '@nestjs/jwt';
import { mockJwtService } from '../../factories/services/jwt.service.factory';
import { Education } from '../../../src/repositories/entities/education.entity';
import { EducationDto } from '../../../src/models/dto/education.dto';
import { CreateEducationDto } from '../../../src/models/dto/admin/create-education.dto';
import { EducationFactory } from '../../factories/repositories/entities/education.entity.factory';
import { EducationDtoFactory } from '../../factories/models/dto/education.dto.factory';
import { CreateEducationDtoFactory } from '../../factories/models/dto/admin/create-education.dto.factory';
import { UpdateEducationDto } from '../../../src/models/dto/admin/update-education.dto';
import { UpdateEducationDtoFactory } from '../../factories/models/dto/admin/update-education.dto.factory';
import { WorkExperienceDto } from '../../../src/models/dto/work-experience.dto';
import { ProjectDto } from '../../../src/models/dto/project.dto';
import { SkillDto } from '../../../src/models/dto/skill.dto';
import { ContactDto } from '../../../src/models/dto/contact.dto';
import { BulletPointDto } from '../../../src/models/dto/bullet-point.dto';
import { InterestDto } from '../../../src/models/dto/interest.dto';
import { TechnologyDto } from '../../../src/models/dto/technology.dto';
import { WorkExperience } from '../../../src/repositories/entities/work-experience.entity';
import { Project } from '../../../src/repositories/entities/project.entity';
import { Skill } from '../../../src/repositories/entities/skill.entity';
import { Contact } from '../../../src/repositories/entities/contact.entity';
import { BulletPoint } from '../../../src/repositories/entities/bullet-point.entity';
import { Interest } from '../../../src/repositories/entities/interest.entity';
import { Technology } from '../../../src/repositories/entities/technology.entity';
import { TechnologyFactory } from '../../factories/repositories/entities/technology.entity.factory';
import { InterestFactory } from '../../factories/repositories/entities/interest.entity.factory';
import { BulletPointFactory } from '../../factories/repositories/entities/bullet-point.entity.factory';
import { ContactFactory } from '../../factories/repositories/entities/contact.entity.factory';
import { SkillFactory } from '../../factories/repositories/entities/skill.entity.factory';
import { ProjectFactory } from '../../factories/repositories/entities/project.entity.factory';
import { WorkExperienceFactory } from '../../factories/repositories/entities/work-experience.entity.factory';
import { CreateWorkExperienceDto } from '../../../src/models/dto/admin/create-work-experience.dto';
import { CreateProjectDto } from '../../../src/models/dto/admin/create-project.dto';
import { CreateSkillDto } from '../../../src/models/dto/admin/create-skill.dto';
import { CreateBulletPointDto } from '../../../src/models/dto/admin/create-bullet-point.dto';
import { CreateInterestDto } from '../../../src/models/dto/admin/create-interest.dto';
import { CreateTechnologyDto } from '../../../src/models/dto/admin/create-technology.dto';
import { UpdateWorkExperienceDto } from '../../../src/models/dto/admin/update-work-experience.dto';
import { UpdateProjectDto } from '../../../src/models/dto/admin/update-project.dto';
import { UpdateSkillDto } from '../../../src/models/dto/admin/update-skill.dto';
import { UpdateContactDto } from '../../../src/models/dto/admin/update-contact.dto';
import { UpdateBulletPointDto } from '../../../src/models/dto/admin/update-bullet-point.dto';
import { UpdateInterestDto } from '../../../src/models/dto/admin/update-interest.dto';
import { UpdateTechnologyDto } from '../../../src/models/dto/admin/update-technology.dto';
import { CreateWorkExperienceDtoFactory } from '../../factories/models/dto/admin/create-work-experience.dto.factory';
import { CreateProjectDtoFactory } from '../../factories/models/dto/admin/create-project.dto.factory';
import { CreateSkillDtoFactory } from '../../factories/models/dto/admin/create-skill.dto.factory';
import { CreateBulletPointDtoFactory } from '../../factories/models/dto/admin/create-bullet-point.dto.factory';
import { CreateInterestDtoFactory } from '../../factories/models/dto/admin/create-interest.dto';
import { CreateTechnologyDtoFactory } from '../../factories/models/dto/admin/create-technology.dto.factory';
import { UpdateProjectDtoFactory } from '../../factories/models/dto/admin/update-project.dto.factory';
import { UpdateWorkExperienceDtoFactory } from '../../factories/models/dto/admin/update-work-experience.dto.factory';
import { UpdateSkillDtoFactory } from '../../factories/models/dto/admin/update-skill.dto.factory';
import { UpdateContactDtoFactory } from '../../factories/models/dto/admin/update-contact.dto.factory';
import { UpdateBulletPointDtoFactory } from '../../factories/models/dto/admin/update-bullet-point.dto.factory';
import { UpdateInterestDtoFactory } from '../../factories/models/dto/admin/update-interest.dto.factory';
import { UpdateTechnologyDtoFactory } from '../../factories/models/dto/admin/update-technology.dto.factory';
import { WorkExperienceDtoFactory } from '../../factories/models/dto/work-experience.dto.factory';
import { ProjectDtoFactory } from '../../factories/models/dto/project.dto.factory';
import { SkillDtoFactory } from '../../factories/models/dto/skill.dto.factory';
import { ContactDtoFactory } from '../../factories/models/dto/contact.dto.factory';
import { CreateContactDto } from '../../../src/models/dto/admin/create-contact.dto';
import { CreateContactDtoFactory } from '../../factories/models/dto/admin/create-contact.dto.factory';
import { BulletPointDtoFactory } from '../../factories/models/dto/bullet-point.dto.factory';
import { InterestDtoFactory } from '../../factories/models/dto/interest.dto.factory';
import { TechnologyDtoFactory } from '../../factories/models/dto/technology.dto.factory';

describe('AdminController', () => {
  let adminController: AdminController;

  let adminService: jest.Mocked<AdminService>;

  let mockUser: User;
  let mockEducation: Education;
  let mockWorkExperience: WorkExperience;
  let mockProject: Project;
  let mockSkill: Skill;
  let mockContact: Contact;
  let mockBulletPoint: BulletPoint;
  let mockInterest: Interest;
  let mockTechnology: Technology;

  let mockCreateEducationDto: CreateEducationDto;
  let mockCreateWorkExperienceDto: CreateWorkExperienceDto;
  let mockCreateProjectDto: CreateProjectDto;
  let mockCreateSkillDto: CreateSkillDto;
  let mockCreateContactDto: CreateContactDto;
  let mockCreateBulletPointDto: CreateBulletPointDto;
  let mockCreateInterestDto: CreateInterestDto;
  let mockCreateTechnologyDto: CreateTechnologyDto;

  let mockUpdateUserDto: UpdateUserDto;
  let mockUpdateEducationDto: UpdateEducationDto;
  let mockUpdateWorkExperienceDto: UpdateWorkExperienceDto;
  let mockUpdateProjectDto: UpdateProjectDto;
  let mockUpdateSkillDto: UpdateSkillDto;
  let mockUpdateContactDto: UpdateContactDto;
  let mockUpdateBulletPointDto: UpdateBulletPointDto;
  let mockUpdateInterestDto: UpdateInterestDto;
  let mockUpdateTechnologyDto: UpdateTechnologyDto;

  let mockUserDto: UserDto;
  let mockEducationDto: EducationDto;
  let mockEducationDtoList: EducationDto[];
  let mockWorkExperienceDto: WorkExperienceDto;
  let mockWorkExperienceDtoList: WorkExperienceDto[];
  let mockProjectDto: ProjectDto;
  let mockProjectDtoList: ProjectDto[];
  let mockSkillDto: SkillDto;
  let mockSkillDtoList: SkillDto[];
  let mockContactDto: ContactDto;
  let mockBulletPointDto: BulletPointDto;
  let mockBulletPointDtoList: BulletPointDto[];
  let mockInterestDto: InterestDto;
  let mockInterestDtoList: InterestDto[];
  let mockTechnologyDto: TechnologyDto;
  let mockTechnologyDtoList: TechnologyDto[];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        { provide: JwtService, useFactory: mockJwtService },
        { provide: UserRepository, useFactory: mockUserRepository },
        {
          provide: ConfigService,
          useFactory: () => mockConfigService(),
        },
        { provide: AdminService, useFactory: mockAdminService },
      ],
    }).compile();

    adminController = module.get(AdminController);

    adminService = module.get(AdminService);

    mockUser = UserFactory.build();
    mockEducation = EducationFactory.build();
    mockWorkExperience = WorkExperienceFactory.build();
    mockProject = ProjectFactory.build();
    mockSkill = SkillFactory.build();
    mockContact = ContactFactory.build();
    mockBulletPoint = BulletPointFactory.build(true);
    mockInterest = InterestFactory.build();
    mockTechnology = TechnologyFactory.build();

    mockCreateEducationDto = CreateEducationDtoFactory.build();
    mockCreateWorkExperienceDto = CreateWorkExperienceDtoFactory.build();
    mockCreateProjectDto = CreateProjectDtoFactory.build();
    mockCreateSkillDto = CreateSkillDtoFactory.build();
    mockCreateContactDto = CreateContactDtoFactory.build();
    mockCreateBulletPointDto = CreateBulletPointDtoFactory.build(true);
    mockCreateInterestDto = CreateInterestDtoFactory.build();
    mockCreateTechnologyDto = CreateTechnologyDtoFactory.build();

    mockUpdateUserDto = UpdateUserDtoFactory.build();
    mockUpdateEducationDto = UpdateEducationDtoFactory.build();
    mockUpdateWorkExperienceDto = UpdateWorkExperienceDtoFactory.build();
    mockUpdateProjectDto = UpdateProjectDtoFactory.build();
    mockUpdateSkillDto = UpdateSkillDtoFactory.build();
    mockUpdateContactDto = UpdateContactDtoFactory.build();
    mockUpdateBulletPointDto = UpdateBulletPointDtoFactory.build();
    mockUpdateInterestDto = UpdateInterestDtoFactory.build();
    mockUpdateTechnologyDto = UpdateTechnologyDtoFactory.build();

    mockUserDto = UserDtoFactory.build(mockUser, mockUpdateUserDto);
    mockEducationDto = EducationDtoFactory.build(
      mockEducation,
      mockCreateEducationDto,
    );
    mockEducationDtoList = EducationDtoFactory.buildList(2, mockEducation);
    mockWorkExperienceDto = WorkExperienceDtoFactory.build(
      mockWorkExperience,
      mockCreateWorkExperienceDto,
    );
    mockWorkExperienceDtoList = WorkExperienceDtoFactory.buildList(
      2,
      mockWorkExperience,
    );
    mockProjectDto = ProjectDtoFactory.build(mockProject, mockCreateProjectDto);
    mockProjectDtoList = ProjectDtoFactory.buildList(2, mockProject);
    mockSkillDto = SkillDtoFactory.build(mockSkill, mockCreateSkillDto);
    mockSkillDtoList = SkillDtoFactory.buildList(2, mockSkill);
    mockContactDto = ContactDtoFactory.build(mockContact, mockCreateContactDto);
    mockBulletPointDto = BulletPointDtoFactory.build(
      mockBulletPoint,
      mockCreateBulletPointDto,
    );
    mockBulletPointDtoList = BulletPointDtoFactory.buildList(
      2,
      mockBulletPoint,
    );
    mockInterestDto = InterestDtoFactory.build(
      mockInterest,
      mockCreateInterestDto,
    );
    mockInterestDtoList = InterestDtoFactory.buildList(2, mockInterest);
    mockTechnologyDto = TechnologyDtoFactory.build(
      mockTechnology,
      mockCreateTechnologyDto,
    );
    mockTechnologyDtoList = TechnologyDtoFactory.buildList(2, mockTechnology);
  });

  describe('getUser', () => {
    it('calls the controller to get a user. -> OK', async () => {
      adminService.getUser.mockResolvedValue(mockUserDto);
      const result = await adminController.getUser(mockUser.id, mockUser);
      expect(result).toEqual(mockUserDto);
    });
  });

  describe('updateUser', () => {
    it('calls the controller to update a user. -> OK', async () => {
      adminService.updateUser.mockResolvedValue(mockUserDto);
      const result = await adminController.updateUser(
        mockUser.id,
        mockUpdateUserDto,
        mockUser,
      );
      expect(result).toEqual(mockUserDto);
    });
  });

  describe('getEducations', () => {
    it('calls the controller to get the educations. -> OK', async () => {
      adminService.getEducations.mockResolvedValue(mockEducationDtoList);
      const result = await adminController.getEducations(mockUser.id, mockUser);
      expect(result).toEqual(mockEducationDtoList);
    });
  });

  describe('createEducation', () => {
    it('calls the controller to create a new education. -> OK', async () => {
      adminService.createEducation.mockResolvedValue(mockEducationDto);
      const result = await adminController.createEducation(
        mockUser.id,
        mockCreateEducationDto,
        mockUser,
      );
      expect(result).toEqual(mockEducationDto);
    });
  });

  describe('updateEducation', () => {
    it('calls the controller to update an education. -> OK', async () => {
      adminService.updateEducation.mockResolvedValue(mockEducationDto);
      const result = await adminController.updateEducation(
        mockUser.id,
        mockEducation.id,
        mockUpdateEducationDto,
        mockUser,
      );
      expect(result).toEqual(mockEducationDto);
    });
  });

  describe('deleteEducation', () => {
    it('calls the controller to delete an education. -> OK', async () => {
      const result = await adminController.deleteEducation(
        mockUser.id,
        mockEducation.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
  });

  describe('getWorkExperiences', () => {
    it('calls the controller to get the workExperiences. -> OK', async () => {
      adminService.getWorkExperiences.mockResolvedValue(
        mockWorkExperienceDtoList,
      );
      const result = await adminController.getWorkExperiences(
        mockUser.id,
        mockUser,
      );
      expect(result).toEqual(mockWorkExperienceDtoList);
    });
  });

  describe('createWorkExperience', () => {
    it('calls the controller to create a new work experience. -> OK', async () => {
      adminService.createWorkExperience.mockResolvedValue(
        mockWorkExperienceDto,
      );
      const result = await adminController.createWorkExperience(
        mockUser.id,
        mockCreateWorkExperienceDto,
        mockUser,
      );
      expect(result).toEqual(mockWorkExperienceDto);
    });
  });

  describe('updateWorkExperience', () => {
    it('calls the controller to update a work experience. -> OK', async () => {
      adminService.updateWorkExperience.mockResolvedValue(
        mockWorkExperienceDto,
      );
      const result = await adminController.updateWorkExperience(
        mockUser.id,
        mockWorkExperience.id,
        mockUpdateWorkExperienceDto,
        mockUser,
      );
      expect(result).toEqual(mockWorkExperienceDto);
    });
  });

  describe('deleteWorkExperience', () => {
    it('calls the controller to delete a work experience. -> OK', async () => {
      const result = await adminController.deleteWorkExperience(
        mockUser.id,
        mockWorkExperience.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
  });

  describe('getProjects', () => {
    it('calls the controller to get the projects. -> OK', async () => {
      adminService.getProjects.mockResolvedValue(mockProjectDtoList);
      const result = await adminController.getProjects(mockUser.id, mockUser);
      expect(result).toEqual(mockProjectDtoList);
    });
  });

  describe('createProject', () => {
    it('calls the controller to create a new project. -> OK', async () => {
      adminService.createProject.mockResolvedValue(mockProjectDto);
      const result = await adminController.createProject(
        mockUser.id,
        mockCreateProjectDto,
        mockUser,
      );
      expect(result).toEqual(mockProjectDto);
    });
  });

  describe('updateProject', () => {
    it('calls the controller to update a project. -> OK', async () => {
      adminService.updateProject.mockResolvedValue(mockProjectDto);
      const result = await adminController.updateProject(
        mockUser.id,
        mockProject.id,
        mockUpdateProjectDto,
        mockUser,
      );
      expect(result).toEqual(mockProjectDto);
    });
  });

  describe('deleteProject', () => {
    it('calls the controller to delete a project. -> OK', async () => {
      const result = await adminController.deleteProject(
        mockUser.id,
        mockProject.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
  });

  describe('getSkills', () => {
    it('calls the controller to get the skills. -> OK', async () => {
      adminService.getSkills.mockResolvedValue(mockSkillDtoList);
      const result = await adminController.getSkills(mockUser.id, mockUser);
      expect(result).toEqual(mockSkillDtoList);
    });
  });

  describe('createSkill', () => {
    it('calls the controller to create a new skill. -> OK', async () => {
      adminService.createSkill.mockResolvedValue(mockSkillDto);
      const result = await adminController.createSkill(
        mockUser.id,
        mockCreateSkillDto,
        mockUser,
      );
      expect(result).toEqual(mockSkillDto);
    });
  });

  describe('updateSkill', () => {
    it('calls the controller to update a skill. -> OK', async () => {
      adminService.updateSkill.mockResolvedValue(mockSkillDto);
      const result = await adminController.updateSkill(
        mockUser.id,
        mockSkill.id,
        mockUpdateSkillDto,
        mockUser,
      );
      expect(result).toEqual(mockSkillDto);
    });
  });

  describe('deleteSkill', () => {
    it('calls the controller to delete a skill. -> OK', async () => {
      const result = await adminController.deleteSkill(
        mockUser.id,
        mockSkill.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
  });

  describe('getContact', () => {
    it('calls the controller to get the contact. -> OK', async () => {
      adminService.getContact.mockResolvedValue(mockContactDto);
      const result = await adminController.getContact(mockUser.id, mockUser);
      expect(result).toEqual(mockContactDto);
    });
  });

  describe('createContact', () => {
    it('calls the controller to create a new contact. -> OK', async () => {
      adminService.createContact.mockResolvedValue(mockContactDto);
      const result = await adminController.createContact(
        mockUser.id,
        mockCreateContactDto,
        mockUser,
      );
      expect(result).toEqual(mockContactDto);
    });
  });

  describe('updateContact', () => {
    it('calls the controller to update a contact. -> OK', async () => {
      adminService.updateContact.mockResolvedValue(mockContactDto);
      const result = await adminController.updateContact(
        mockUser.id,
        mockContact.id,
        mockUpdateContactDto,
        mockUser,
      );
      expect(result).toEqual(mockContactDto);
    });
  });

  describe('deleteContact', () => {
    it('calls the controller to delete a contact. -> OK', async () => {
      const result = await adminController.deleteContact(
        mockUser.id,
        mockContact.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
  });

  describe('getBulletPoints', () => {
    it('calls the controller to get the bullet points. -> OK', async () => {
      adminService.getBulletPoints.mockResolvedValue(mockBulletPointDtoList);
      const result = await adminController.getBulletPoints(
        mockUser.id,
        mockUser,
      );
      expect(result).toEqual(mockBulletPointDtoList);
    });
  });

  describe('createBulletPoint', () => {
    it('calls the controller to create a new bullet point. -> OK', async () => {
      adminService.createBulletPoint.mockResolvedValue(mockBulletPointDto);
      const result = await adminController.createBulletPoint(
        mockUser.id,
        mockCreateBulletPointDto,
        mockUser,
      );
      expect(result).toEqual(mockBulletPointDto);
    });
  });

  describe('updateBulletPoint', () => {
    it('calls the controller to update a bullet point. -> OK', async () => {
      adminService.updateBulletPoint.mockResolvedValue(mockBulletPointDto);
      const result = await adminController.updateBulletPoint(
        mockUser.id,
        mockBulletPoint.id,
        mockUpdateBulletPointDto,
        mockUser,
      );
      expect(result).toEqual(mockBulletPointDto);
    });
  });

  describe('deleteBulletPoint', () => {
    it('calls the controller to delete a bullet point. -> OK', async () => {
      const result = await adminController.deleteBulletPoint(
        mockUser.id,
        mockBulletPoint.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
  });

  describe('getInterests', () => {
    it('calls the controller to get the interests. -> OK', async () => {
      adminService.getInterests.mockResolvedValue(mockInterestDtoList);
      const result = await adminController.getInterests(mockUser.id, mockUser);
      expect(result).toEqual(mockInterestDtoList);
    });
  });

  describe('createInterest', () => {
    it('calls the controller to create a new interest. -> OK', async () => {
      adminService.createInterest.mockResolvedValue(mockInterestDto);
      const result = await adminController.createInterest(
        mockUser.id,
        mockCreateInterestDto,
        mockUser,
      );
      expect(result).toEqual(mockInterestDto);
    });
  });

  describe('updateInterest', () => {
    it('calls the controller to update a interest. -> OK', async () => {
      adminService.updateInterest.mockResolvedValue(mockInterestDto);
      const result = await adminController.updateInterest(
        mockUser.id,
        mockInterest.id,
        mockUpdateInterestDto,
        mockUser,
      );
      expect(result).toEqual(mockInterestDto);
    });
  });

  describe('deleteInterest', () => {
    it('calls the controller to delete an interest. -> OK', async () => {
      const result = await adminController.deleteInterest(
        mockUser.id,
        mockInterest.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
  });

  describe('getTechnologies', () => {
    it('calls the controller to get the technologies. -> OK', async () => {
      adminService.getTechnologies.mockResolvedValue(mockTechnologyDtoList);
      const result = await adminController.getTechnologies(
        mockUser.id,
        mockUser,
      );
      expect(result).toEqual(mockTechnologyDtoList);
    });
  });

  describe('createTechnology', () => {
    it('calls the controller to create a new technology. -> OK', async () => {
      adminService.createTechnology.mockResolvedValue(mockTechnologyDto);
      const result = await adminController.createTechnology(
        mockUser.id,
        mockCreateTechnologyDto,
        mockUser,
      );
      expect(result).toEqual(mockTechnologyDto);
    });
  });

  describe('updateTechnology', () => {
    it('calls the controller to update a new technology. -> OK', async () => {
      adminService.updateTechnology.mockResolvedValue(mockTechnologyDto);
      const result = await adminController.updateTechnology(
        mockUser.id,
        mockTechnology.id,
        mockUpdateTechnologyDto,
        mockUser,
      );
      expect(result).toEqual(mockTechnologyDto);
    });
  });

  describe('deleteTechnology', () => {
    it('calls the controller to delete a technology. -> OK', async () => {
      const result = await adminController.deleteTechnology(
        mockUser.id,
        mockTechnology.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
  });
});
