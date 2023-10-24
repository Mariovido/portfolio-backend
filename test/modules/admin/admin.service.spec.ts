import { Test } from '@nestjs/testing';
import { AdminService } from '../../../src/modules/admin/admin.service';
import { User } from '../../../src/repositories/entities/user.entity';
import { UserRepository } from '../../../src/repositories/user.repository';
import { mockUserRepository } from '../../factories/repositories/user.repository.factory';
import { UserFactory } from '../../factories/repositories/entities/user.entity.factory';
import { UpdateUserDtoFactory } from '../../factories/models/dto/admin/update-user.dto.factory';
import { UserDtoFactory } from '../../factories/models/dto/user.dto.factory';
import { UserDto } from '../../../src/models/dto/user.dto';
import { UpdateUserDto } from '../../../src/models/dto/admin/update-user.dto';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EducationRepository } from '../../../src/repositories/education.repository';
import { mockEducationRepository } from '../../factories/repositories/education.repository.factory';
import { Education } from '../../../src/repositories/entities/education.entity';
import { EducationDto } from '../../../src/models/dto/education.dto';
import { CreateEducationDto } from '../../../src/models/dto/admin/create-education.dto';
import { EducationFactory } from '../../factories/repositories/entities/education.entity.factory';
import { CreateEducationDtoFactory } from '../../factories/models/dto/admin/create-education.dto.factory';
import { EducationDtoFactory } from '../../factories/models/dto/education.dto.factory';
import { WorkExperienceRepository } from '../../../src/repositories/work-experience.repository';
import { mockWorkExperienceRepository } from '../../factories/repositories/work-experience.repository.factory';
import { mockProjectRepository } from '../../factories/repositories/project.repository.factory';
import { mockSkillRepository } from '../../factories/repositories/skill.repository.factory';
import { mockContactRepository } from '../../factories/repositories/contact.repository.factory';
import { ProjectRepository } from '../../../src/repositories/project.repository';
import { SkillRepository } from '../../../src/repositories/skill.repository';
import { ContactRepository } from '../../../src/repositories/contact.repository';
import { BulletPointRepository } from '../../../src/repositories/bullet-point.repository';
import { TagRepository } from '../../../src/repositories/tag.repository';
import { TechnologyRepository } from '../../../src/repositories/technology.repository';
import { mockBulletPointRepository } from '../../factories/repositories/bullet-point.repository.factory';
import { mockTagRepository } from '../../factories/repositories/tag.repository.factory';
import { mockTechnologyRepository } from '../../factories/repositories/technology.repository.factory';
import { WorkExperience } from '../../../src/repositories/entities/work-experience.entity';
import { Project } from '../../../src/repositories/entities/project.entity';
import { Skill } from '../../../src/repositories/entities/skill.entity';
import { Contact } from '../../../src/repositories/entities/contact.entity';
import { BulletPoint } from '../../../src/repositories/entities/bullet-point.entity';
import { Technology } from '../../../src/repositories/entities/technology.entity';
import { CreateWorkExperienceDto } from '../../../src/models/dto/admin/create-work-experience.dto';
import { CreateProjectDto } from '../../../src/models/dto/admin/create-project.dto';
import { CreateSkillDto } from '../../../src/models/dto/admin/create-skill.dto';
import { CreateContactDto } from '../../../src/models/dto/admin/create-contact.dto';
import { CreateBulletPointDto } from '../../../src/models/dto/admin/create-bullet-point.dto';
import { CreateTagDto } from '../../../src/models/dto/admin/create-tag.dto';
import { CreateTechnologyDto } from '../../../src/models/dto/admin/create-technology.dto';
import { UpdateEducationDto } from '../../../src/models/dto/admin/update-education.dto';
import { UpdateWorkExperienceDto } from '../../../src/models/dto/admin/update-work-experience.dto';
import { UpdateProjectDto } from '../../../src/models/dto/admin/update-project.dto';
import { UpdateSkillDto } from '../../../src/models/dto/admin/update-skill.dto';
import { UpdateContactDto } from '../../../src/models/dto/admin/update-contact.dto';
import { UpdateBulletPointDto } from '../../../src/models/dto/admin/update-bullet-point.dto';
import { UpdateTagDto } from '../../../src/models/dto/admin/update-tag.dto';
import { UpdateTechnologyDto } from '../../../src/models/dto/admin/update-technology.dto';
import { WorkExperienceDto } from '../../../src/models/dto/work-experience.dto';
import { ProjectDto } from '../../../src/models/dto/project.dto';
import { SkillDto } from '../../../src/models/dto/skill.dto';
import { ContactDto } from '../../../src/models/dto/contact.dto';
import { BulletPointDto } from '../../../src/models/dto/bullet-point.dto';
import { TechnologyDto } from '../../../src/models/dto/technology.dto';
import { WorkExperienceFactory } from '../../factories/repositories/entities/work-experience.entity.factory';
import { ProjectFactory } from '../../factories/repositories/entities/project.entity.factory';
import { SkillFactory } from '../../factories/repositories/entities/skill.entity.factory';
import { ContactFactory } from '../../factories/repositories/entities/contact.entity.factory';
import { BulletPointFactory } from '../../factories/repositories/entities/bullet-point.entity.factory';
import { TagFactory } from '../../factories/repositories/entities/interest.entity.factory';
import { TechnologyFactory } from '../../factories/repositories/entities/technology.entity.factory';
import { CreateWorkExperienceDtoFactory } from '../../factories/models/dto/admin/create-work-experience.dto.factory';
import { CreateProjectDtoFactory } from '../../factories/models/dto/admin/create-project.dto.factory';
import { CreateSkillDtoFactory } from '../../factories/models/dto/admin/create-skill.dto.factory';
import { CreateContactDtoFactory } from '../../factories/models/dto/admin/create-contact.dto.factory';
import { CreateBulletPointDtoFactory } from '../../factories/models/dto/admin/create-bullet-point.dto.factory';
import { CreateTagDtoFactory } from '../../factories/models/dto/admin/create-tag.dto.factory';
import { CreateTechnologyDtoFactory } from '../../factories/models/dto/admin/create-technology.dto.factory';
import { UpdateEducationDtoFactory } from '../../factories/models/dto/admin/update-education.dto.factory';
import { UpdateWorkExperienceDtoFactory } from '../../factories/models/dto/admin/update-work-experience.dto.factory';
import { UpdateProjectDtoFactory } from '../../factories/models/dto/admin/update-project.dto.factory';
import { UpdateSkillDtoFactory } from '../../factories/models/dto/admin/update-skill.dto.factory';
import { UpdateContactDtoFactory } from '../../factories/models/dto/admin/update-contact.dto.factory';
import { UpdateBulletPointDtoFactory } from '../../factories/models/dto/admin/update-bullet-point.dto.factory';
import { UpdateTagDtoFactory } from '../../factories/models/dto/admin/update-tag.dto.factory';
import { UpdateTechnologyDtoFactory } from '../../factories/models/dto/admin/update-technology.dto.factory';
import { WorkExperienceDtoFactory } from '../../factories/models/dto/work-experience.dto.factory';
import { ProjectDtoFactory } from '../../factories/models/dto/project.dto.factory';
import { SkillDtoFactory } from '../../factories/models/dto/skill.dto.factory';
import { ContactDtoFactory } from '../../factories/models/dto/contact.dto.factory';
import { BulletPointDtoFactory } from '../../factories/models/dto/bullet-point.dto.factory';
import { TagDtoFactory } from '../../factories/models/dto/tag.dto.factory';
import { TechnologyDtoFactory } from '../../factories/models/dto/technology.dto.factory';
import { DeleteResultFactory } from '../../factories/database/delete-result.factory';
import { DeleteResult } from 'typeorm';
import { Tag } from '../../../src/repositories/entities/tag.entity';
import { TagDto } from '../../../src/models/dto/tag.dto';

describe('AdminService', () => {
  let adminService: AdminService;

  let userRepository: jest.Mocked<UserRepository>;
  let educationRepository: jest.Mocked<EducationRepository>;
  let workExperienceRepository: jest.Mocked<WorkExperienceRepository>;
  let projectRepository: jest.Mocked<ProjectRepository>;
  let skillRepository: jest.Mocked<SkillRepository>;
  let contactRepository: jest.Mocked<ContactRepository>;
  let bulletPointRepository: jest.Mocked<BulletPointRepository>;
  let tagRepository: jest.Mocked<TagRepository>;
  let technologyRepository: jest.Mocked<TechnologyRepository>;

  let mockUser: User;
  let mockEducation: Education;
  let mockEducationList: Education[];
  let mockWorkExperience: WorkExperience;
  let mockWorkExperienceList: WorkExperience[];
  let mockProject: Project;
  let mockProjectList: Project[];
  let mockSkill: Skill;
  let mockSkillList: Skill[];
  let mockContact: Contact;
  let mockBulletPoint: BulletPoint;
  let mockBulletPointList: BulletPoint[];
  let mockTag: Tag;
  let mockTagList: Tag[];
  let mockTechnology: Technology;
  let mockTechnologyList: Technology[];

  let mockCreateEducationDto: CreateEducationDto;
  let mockCreateWorkExperienceDto: CreateWorkExperienceDto;
  let mockCreateProjectDto: CreateProjectDto;
  let mockCreateSkillDto: CreateSkillDto;
  let mockCreateContactDto: CreateContactDto;
  let mockCreateBulletPointDto: CreateBulletPointDto;
  let mockCreateTagDto: CreateTagDto;
  let mockCreateTechnologyDto: CreateTechnologyDto;

  let mockUpdateUserDto: UpdateUserDto;
  let mockUpdateEducationDto: UpdateEducationDto;
  let mockUpdateWorkExperienceDto: UpdateWorkExperienceDto;
  let mockUpdateProjectDto: UpdateProjectDto;
  let mockUpdateSkillDto: UpdateSkillDto;
  let mockUpdateContactDto: UpdateContactDto;
  let mockUpdateBulletPointDto: UpdateBulletPointDto;
  let mockUpdateTagDto: UpdateTagDto;
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
  let mockTagDto: TagDto;
  let mockTagDtolist: TagDto[];
  let mockTechnologyDto: TechnologyDto;
  let mockTechnologyDtoList: TechnologyDto[];

  let mockDeleteResult: DeleteResult;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: EducationRepository, useFactory: mockEducationRepository },
        {
          provide: WorkExperienceRepository,
          useFactory: mockWorkExperienceRepository,
        },
        { provide: ProjectRepository, useFactory: mockProjectRepository },
        { provide: SkillRepository, useFactory: mockSkillRepository },
        { provide: ContactRepository, useFactory: mockContactRepository },
        {
          provide: BulletPointRepository,
          useFactory: mockBulletPointRepository,
        },
        { provide: TagRepository, useFactory: mockTagRepository },
        { provide: TechnologyRepository, useFactory: mockTechnologyRepository },
      ],
    }).compile();

    adminService = module.get(AdminService);

    userRepository = module.get(UserRepository);
    educationRepository = module.get(EducationRepository);
    workExperienceRepository = module.get(WorkExperienceRepository);
    projectRepository = module.get(ProjectRepository);
    skillRepository = module.get(SkillRepository);
    contactRepository = module.get(ContactRepository);
    bulletPointRepository = module.get(BulletPointRepository);
    tagRepository = module.get(TagRepository);
    technologyRepository = module.get(TechnologyRepository);

    mockUser = UserFactory.build();
    mockEducation = EducationFactory.build();
    mockEducationList = EducationFactory.buildList(2);
    mockWorkExperience = WorkExperienceFactory.build();
    mockWorkExperienceList = WorkExperienceFactory.buildList(2);
    mockProject = ProjectFactory.build();
    mockProjectList = ProjectFactory.buildList(2);
    mockSkill = SkillFactory.build();
    mockSkillList = SkillFactory.buildList(2);
    mockContact = ContactFactory.build();
    mockBulletPoint = BulletPointFactory.build(true);
    mockBulletPointList = BulletPointFactory.buildList(2, true);
    mockTag = TagFactory.build();
    mockTagList = TagFactory.buildList(2);
    mockTechnology = TechnologyFactory.build();
    mockTechnologyList = TechnologyFactory.buildList(2);

    mockCreateEducationDto = CreateEducationDtoFactory.build();
    mockCreateWorkExperienceDto = CreateWorkExperienceDtoFactory.build();
    mockCreateProjectDto = CreateProjectDtoFactory.build();
    mockCreateSkillDto = CreateSkillDtoFactory.build();
    mockCreateContactDto = CreateContactDtoFactory.build();
    mockCreateBulletPointDto = CreateBulletPointDtoFactory.build(true);
    mockCreateTagDto = CreateTagDtoFactory.build();
    mockCreateTechnologyDto = CreateTechnologyDtoFactory.build();

    mockUpdateUserDto = UpdateUserDtoFactory.build();
    mockUpdateEducationDto = UpdateEducationDtoFactory.build();
    mockUpdateWorkExperienceDto = UpdateWorkExperienceDtoFactory.build();
    mockUpdateProjectDto = UpdateProjectDtoFactory.build();
    mockUpdateSkillDto = UpdateSkillDtoFactory.build();
    mockUpdateContactDto = UpdateContactDtoFactory.build();
    mockUpdateBulletPointDto = UpdateBulletPointDtoFactory.build();
    mockUpdateTagDto = UpdateTagDtoFactory.build();
    mockUpdateTechnologyDto = UpdateTechnologyDtoFactory.build();

    mockUserDto = UserDtoFactory.build(mockUser, mockUpdateUserDto);
    mockEducationDto = EducationDtoFactory.build(
      mockEducation,
      mockCreateEducationDto,
    );
    mockEducationDtoList =
      EducationDtoFactory.buildListByEducationList(mockEducationList);
    mockWorkExperienceDto = WorkExperienceDtoFactory.build(
      mockWorkExperience,
      mockCreateWorkExperienceDto,
    );
    mockWorkExperienceDtoList =
      WorkExperienceDtoFactory.buildListWorkExperienceList(
        mockWorkExperienceList,
      );
    mockProjectDto = ProjectDtoFactory.build(mockProject, mockCreateProjectDto);
    mockProjectDtoList =
      ProjectDtoFactory.buildListByProjectList(mockProjectList);
    mockSkillDto = SkillDtoFactory.build(mockSkill, mockCreateSkillDto);
    mockSkillDtoList = SkillDtoFactory.buildListBySkillList(mockSkillList);
    mockContactDto = ContactDtoFactory.build(mockContact, mockCreateContactDto);
    mockBulletPointDto = BulletPointDtoFactory.build(
      mockBulletPoint,
      mockCreateBulletPointDto,
    );
    mockBulletPointDtoList =
      BulletPointDtoFactory.buildListByBulletPointList(mockBulletPointList);
    mockTagDto = TagDtoFactory.build(mockTag, mockCreateTagDto);
    mockTagDtolist = TagDtoFactory.buildListByTagList(mockTagList);
    mockTechnologyDto = TechnologyDtoFactory.build(
      mockTechnology,
      mockCreateTechnologyDto,
    );
    mockTechnologyDtoList =
      TechnologyDtoFactory.buildListByTechnologyList(mockTechnologyList);

    mockDeleteResult = DeleteResultFactory.build({ affected: 1 });
  });

  describe('getUser', () => {
    it('calls the service to get a user. -> OK', async () => {
      mockUserDto = UserDtoFactory.build(mockUser);
      const educations = mockUser.educations.map((education) => {
        const educationAux = new EducationDto();
        educationAux.id = education.id;
        return educationAux;
      });
      mockUserDto.educations = educations;
      const workExperiences = mockUser.workExperiences.map((workExperience) => {
        const workExperienceAux = new WorkExperienceDto();
        workExperienceAux.id = workExperience.id;
        return workExperienceAux;
      });
      mockUserDto.workExperiences = workExperiences;
      const skills = mockUser.skills.map((skill) => {
        const skillAux = new SkillDto();
        skillAux.id = skill.id;
        return skillAux;
      });
      mockUserDto.skills = skills;
      const projects = mockUser.projects.map((project) => {
        const projectAux = new ProjectDto();
        projectAux.id = project.id;
        return projectAux;
      });
      mockUserDto.projects = projects;
      const contact = new ContactDto();
      contact.id = mockUser.contact.id;
      mockUserDto.contact = contact;
      userRepository.findOneBy.mockResolvedValue(mockUser);
      const result = await adminService.getUser(mockUser.id, mockUser);
      expect(result).toEqual(mockUserDto);
    });
    it('calls the service to get a user but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.getUser(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('updateUser', () => {
    it('calls the service to update a user. -> OK', async () => {
      mockUserDto = UserDtoFactory.build(mockUser);
      userRepository.updateUser.mockResolvedValue(mockUser);
      const result = await adminService.updateUser(
        mockUser.id,
        mockUpdateUserDto,
        mockUser,
      );
      expect(result).toEqual(mockUserDto);
    });
    it('calls the service to update a user but the user is not authorized. -> KO', async () => {
      userRepository.updateUser.mockResolvedValue(mockUser);
      const result = async () => {
        await adminService.updateUser(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockUpdateUserDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getEducations', () => {
    it('calls the service to get an education. -> OK', async () => {
      mockEducationDtoList.forEach(
        (mockEducationAux) => (mockEducationAux.user = mockUser.id),
      );
      educationRepository.findEducationByUserId.mockResolvedValue(
        mockEducationList,
      );
      const result = await adminService.getEducations(mockUser.id, mockUser);
      expect(result).toEqual(mockEducationDtoList);
    });
    it('calls the service to get the educations but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.getEducations(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to get the educations but the educations are not found. -> KO', async () => {
      educationRepository.findEducationByUserId.mockResolvedValue([]);
      const result = async () => {
        await adminService.getEducations(mockUser.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('createEducation', () => {
    it('calls the service to create an education. -> OK', async () => {
      mockEducationDto = EducationDtoFactory.build(mockEducation);
      educationRepository.createEducation.mockResolvedValue(mockEducation);
      const result = await adminService.createEducation(
        mockUser.id,
        mockCreateEducationDto,
        mockUser,
      );
      expect(result).toEqual(mockEducationDto);
    });
    it('calls the service to create an education but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.createEducation(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockCreateEducationDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('updateEducation', () => {
    it('calls the service to update an education. -> OK', async () => {
      mockEducationDto = EducationDtoFactory.build(mockEducation);
      educationRepository.updateEducation.mockResolvedValue(mockEducation);
      educationRepository.findOneBy.mockResolvedValue(mockEducation);
      const result = await adminService.updateEducation(
        mockUser.id,
        mockEducation.id,
        mockUpdateEducationDto,
        mockUser,
      );
      expect(result).toEqual(mockEducationDto);
    });
    it('calls the service to update an education but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.updateEducation(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockEducation.id,
          mockUpdateEducationDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to update an education but the education is not found. -> KO', async () => {
      educationRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await adminService.updateEducation(
          mockUser.id,
          mockEducation.id,
          mockUpdateEducationDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteEducation', () => {
    it('calls the service to delete an education. -> OK', async () => {
      educationRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = await adminService.deleteEducation(
        mockUser.id,
        mockEducation.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
    it('calls the service to delete an education but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.deleteEducation(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockEducation.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to delete an education but the education is not found. -> KO', async () => {
      mockDeleteResult.affected = 0;
      educationRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = async () => {
        await adminService.deleteEducation(
          mockUser.id,
          mockEducation.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getWorkExperiences', () => {
    it('calls the service to get a work experiences. -> OK', async () => {
      mockWorkExperienceDtoList.forEach(
        (mockWorkExperienceAux) => (mockWorkExperienceAux.user = mockUser.id),
      );
      workExperienceRepository.findWorkExperienceByUserId.mockResolvedValue(
        mockWorkExperienceList,
      );
      const result = await adminService.getWorkExperiences(
        mockUser.id,
        mockUser,
      );
      expect(result).toEqual(mockWorkExperienceDtoList);
    });
    it('calls the service to get the work experiences but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.getWorkExperiences(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to get the work experiences but the work experiences are not found. -> KO', async () => {
      workExperienceRepository.findWorkExperienceByUserId.mockResolvedValue([]);
      const result = async () => {
        await adminService.getWorkExperiences(mockUser.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('createWorkExperience', () => {
    it('calls the service to create a work experience. -> OK', async () => {
      mockWorkExperienceDto =
        WorkExperienceDtoFactory.build(mockWorkExperience);
      delete mockWorkExperienceDto.bulletPoints;
      workExperienceRepository.createWorkExperience.mockResolvedValue(
        mockWorkExperience,
      );
      const result = await adminService.createWorkExperience(
        mockUser.id,
        mockCreateWorkExperienceDto,
        mockUser,
      );
      expect(result).toEqual(mockWorkExperienceDto);
    });
    it('calls the service to create a work experience but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.createWorkExperience(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockCreateWorkExperienceDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('updateWorkExperience', () => {
    it('calls the service to update a work experience. -> OK', async () => {
      mockWorkExperienceDto =
        WorkExperienceDtoFactory.build(mockWorkExperience);
      delete mockWorkExperienceDto.bulletPoints;
      workExperienceRepository.updateWorkExperience.mockResolvedValue(
        mockWorkExperience,
      );
      workExperienceRepository.findOneBy.mockResolvedValue(mockWorkExperience);
      const result = await adminService.updateWorkExperience(
        mockUser.id,
        mockWorkExperience.id,
        mockUpdateWorkExperienceDto,
        mockUser,
      );
      expect(result).toEqual(mockWorkExperienceDto);
    });
    it('calls the service to update a work experience but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.updateWorkExperience(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockWorkExperience.id,
          mockUpdateWorkExperienceDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to update a work experience but the work experience is not found. -> KO', async () => {
      workExperienceRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await adminService.updateWorkExperience(
          mockUser.id,
          mockWorkExperience.id,
          mockUpdateWorkExperienceDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteWorkExperience', () => {
    it('calls the service to delete a work experience. -> OK', async () => {
      workExperienceRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = await adminService.deleteWorkExperience(
        mockUser.id,
        mockWorkExperience.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
    it('calls the service to delete a work experience but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.deleteWorkExperience(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockWorkExperience.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to delete a work experience but the work experience is not found. -> KO', async () => {
      mockDeleteResult.affected = 0;
      workExperienceRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = async () => {
        await adminService.deleteWorkExperience(
          mockUser.id,
          mockWorkExperience.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getProjects', () => {
    it('calls the service to get a projects. -> OK', async () => {
      mockProjectDtoList.forEach(
        (mockProjectAux) => (mockProjectAux.user = mockUser.id),
      );
      projectRepository.findProjectsByUserId.mockResolvedValue(mockProjectList);
      const result = await adminService.getProjects(mockUser.id, mockUser);
      expect(result).toEqual(mockProjectDtoList);
    });
    it('calls the service to get the projects but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.getProjects(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to get the projects but the projects are not found. -> KO', async () => {
      projectRepository.findProjectsByUserId.mockResolvedValue([]);
      const result = async () => {
        await adminService.getProjects(mockUser.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('createProject', () => {
    it('calls the service to create a project. -> OK', async () => {
      mockProjectDto = ProjectDtoFactory.build(mockProject);
      delete mockProjectDto.bulletPoints;
      delete mockProjectDto.technologies;
      projectRepository.createProject.mockResolvedValue(mockProject);
      const result = await adminService.createProject(
        mockUser.id,
        mockCreateProjectDto,
        mockUser,
      );
      expect(result).toEqual(mockProjectDto);
    });
    it('calls the service to create a project but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.createProject(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockCreateProjectDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('updateProject', () => {
    it('calls the service to update a project. -> OK', async () => {
      mockProjectDto = ProjectDtoFactory.build(mockProject);
      delete mockProjectDto.bulletPoints;
      delete mockProjectDto.technologies;
      projectRepository.updateProject.mockResolvedValue(mockProject);
      projectRepository.findOneBy.mockResolvedValue(mockProject);
      const result = await adminService.updateProject(
        mockUser.id,
        mockProject.id,
        mockUpdateProjectDto,
        mockUser,
      );
      expect(result).toEqual(mockProjectDto);
    });
    it('calls the service to update a project but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.updateProject(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockProject.id,
          mockUpdateProjectDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to update a project but the project is not found. -> KO', async () => {
      projectRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await adminService.updateProject(
          mockUser.id,
          mockProject.id,
          mockUpdateProjectDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteProject', () => {
    it('calls the service to delete a project. -> OK', async () => {
      projectRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = await adminService.deleteProject(
        mockUser.id,
        mockProject.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
    it('calls the service to delete a project but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.deleteProject(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockProject.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to delete a project but the project is not found. -> KO', async () => {
      mockDeleteResult.affected = 0;
      projectRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = async () => {
        await adminService.deleteProject(mockUser.id, mockProject.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getSkills', () => {
    it('calls the service to get a skill. -> OK', async () => {
      mockSkillDtoList.forEach(
        (mockSkillAux) => (mockSkillAux.user = mockUser.id),
      );
      skillRepository.findSkillsByUserId.mockResolvedValue(mockSkillList);
      const result = await adminService.getSkills(mockUser.id, mockUser);
      expect(result).toEqual(mockSkillDtoList);
    });
    it('calls the service to get the skills but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.getSkills(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to get the skills but the skills are not found. -> KO', async () => {
      skillRepository.findSkillsByUserId.mockResolvedValue([]);
      const result = async () => {
        await adminService.getSkills(mockUser.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('createSkill', () => {
    it('calls the service to create a skill. -> OK', async () => {
      mockSkillDto = SkillDtoFactory.build(mockSkill);
      skillRepository.createSkill.mockResolvedValue(mockSkill);
      const result = await adminService.createSkill(
        mockUser.id,
        mockCreateSkillDto,
        mockUser,
      );
      expect(result).toEqual(mockSkillDto);
    });
    it('calls the service to create a skill but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.createSkill(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockCreateSkillDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('updateSkill', () => {
    it('calls the service to update a skill. -> OK', async () => {
      mockSkillDto = SkillDtoFactory.build(mockSkill);
      skillRepository.updateSkill.mockResolvedValue(mockSkill);
      skillRepository.findOneBy.mockResolvedValue(mockSkill);
      const result = await adminService.updateSkill(
        mockUser.id,
        mockSkill.id,
        mockUpdateSkillDto,
        mockUser,
      );
      expect(result).toEqual(mockSkillDto);
    });
    it('calls the service to update a skill but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.updateSkill(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockSkill.id,
          mockUpdateSkillDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to update a skill but the skill is not found. -> KO', async () => {
      skillRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await adminService.updateSkill(
          mockUser.id,
          mockSkill.id,
          mockUpdateSkillDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteSkill', () => {
    it('calls the service to delete a skill. -> OK', async () => {
      skillRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = await adminService.deleteSkill(
        mockUser.id,
        mockSkill.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
    it('calls the service to delete a skill but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.deleteSkill(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockSkill.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to delete a skill but the skill is not found. -> KO', async () => {
      mockDeleteResult.affected = 0;
      skillRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = async () => {
        await adminService.deleteSkill(mockUser.id, mockSkill.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getContact', () => {
    it('calls the service to get an education. -> OK', async () => {
      mockContactDto = ContactDtoFactory.build(mockContact);
      mockContactDto.user = mockUser.id;
      contactRepository.findContactsByUserId.mockResolvedValue(mockContact);
      const result = await adminService.getContact(mockUser.id, mockUser);
      expect(result).toEqual(mockContactDto);
    });
    it('calls the service to get the educations but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.getContact(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to get the educations but the educations are not found. -> KO', async () => {
      contactRepository.findContactsByUserId.mockResolvedValue(null);
      const result = async () => {
        await adminService.getContact(mockUser.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('createContact', () => {
    it('calls the service to create a contact. -> OK', async () => {
      mockContactDto = ContactDtoFactory.build(mockContact);
      contactRepository.createContact.mockResolvedValue(mockContact);
      const result = await adminService.createContact(
        mockUser.id,
        mockCreateContactDto,
        mockUser,
      );
      expect(result).toEqual(mockContactDto);
    });
    it('calls the service to create a contact but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.createContact(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockCreateContactDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('updateContact', () => {
    it('calls the service to update a contact. -> OK', async () => {
      mockContactDto = ContactDtoFactory.build(mockContact);
      contactRepository.updateContact.mockResolvedValue(mockContact);
      contactRepository.findOneBy.mockResolvedValue(mockContact);
      const result = await adminService.updateContact(
        mockUser.id,
        mockContact.id,
        mockUpdateContactDto,
        mockUser,
      );
      expect(result).toEqual(mockContactDto);
    });
    it('calls the service to update a contact but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.updateContact(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockContact.id,
          mockUpdateContactDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to update a contact but the contact is not found. -> KO', async () => {
      contactRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await adminService.updateContact(
          mockUser.id,
          mockContact.id,
          mockUpdateContactDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteContact', () => {
    it('calls the service to delete a contact. -> OK', async () => {
      contactRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = await adminService.deleteContact(
        mockUser.id,
        mockContact.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
    it('calls the service to delete a contact but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.deleteContact(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockContact.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to delete a contact but the contact is not found. -> KO', async () => {
      mockDeleteResult.affected = 0;
      contactRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = async () => {
        await adminService.deleteContact(mockUser.id, mockContact.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getBulletPoints', () => {
    it('calls the service to get a bullet points with projects. -> OK', async () => {
      projectRepository.findProjectsByUserId.mockResolvedValue(mockProjectList);
      workExperienceRepository.findWorkExperienceByUserId.mockResolvedValue([]);
      bulletPointRepository.findBulletPointByProjects.mockResolvedValue(
        mockBulletPointList,
      );
      const result = await adminService.getBulletPoints(mockUser.id, mockUser);
      expect(result).toEqual(mockBulletPointDtoList);
    });
    it('calls the service to get a bullet points with work experiences. -> OK', async () => {
      projectRepository.findProjectsByUserId.mockResolvedValue([]);
      workExperienceRepository.findWorkExperienceByUserId.mockResolvedValue(
        mockWorkExperienceList,
      );
      bulletPointRepository.findBulletPointByWorkExperiences.mockResolvedValue(
        mockBulletPointList,
      );
      const result = await adminService.getBulletPoints(mockUser.id, mockUser);
      expect(result).toEqual(mockBulletPointDtoList);
    });
    it('calls the service to get the bullet points but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.getBulletPoints(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to get the bullet points but the projects and work experiences are not found. -> KO', async () => {
      projectRepository.findProjectsByUserId.mockResolvedValue([]);
      workExperienceRepository.findWorkExperienceByUserId.mockResolvedValue([]);
      const result = async () => {
        await adminService.getBulletPoints(mockUser.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
    it('calls the service to get the bullet points but the bullet points are not found. -> KO', async () => {
      projectRepository.findProjectsByUserId.mockResolvedValue(mockProjectList);
      workExperienceRepository.findWorkExperienceByUserId.mockResolvedValue([]);
      bulletPointRepository.findBulletPointByProjects.mockResolvedValue([]);
      const result = async () => {
        await adminService.getBulletPoints(mockUser.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('createBulletPoint', () => {
    it('calls the service to create a bullet point. -> OK', async () => {
      mockBulletPointDto = BulletPointDtoFactory.build(mockBulletPoint);
      bulletPointRepository.createBulletPoint.mockResolvedValue(
        mockBulletPoint,
      );
      const result = await adminService.createBulletPoint(
        mockUser.id,
        mockCreateBulletPointDto,
        mockUser,
      );
      expect(result).toEqual(mockBulletPointDto);
    });
    it('calls the service to create a bullet point but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.createBulletPoint(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockCreateBulletPointDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to create a bullet point but project and work experience are both not empty. -> KO', async () => {
      mockCreateBulletPointDto.project = '4f8d94aa-a7c8-485d-9c7f-e71cc5423ab3';
      const result = async () => {
        await adminService.createBulletPoint(
          mockUser.id,
          mockCreateBulletPointDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateBulletPoint', () => {
    it('calls the service to update a bullet point. -> OK', async () => {
      mockBulletPointDto = BulletPointDtoFactory.build(mockBulletPoint);
      bulletPointRepository.updateBulletPoint.mockResolvedValue(
        mockBulletPoint,
      );
      bulletPointRepository.findOneBy.mockResolvedValue(mockBulletPoint);
      const result = await adminService.updateBulletPoint(
        mockUser.id,
        mockBulletPoint.id,
        mockUpdateBulletPointDto,
        mockUser,
      );
      expect(result).toEqual(mockBulletPointDto);
    });
    it('calls the service to update a bullet point but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.updateBulletPoint(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockBulletPoint.id,
          mockUpdateBulletPointDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to update a bullet point but the bullet point is not found. -> KO', async () => {
      bulletPointRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await adminService.updateBulletPoint(
          mockUser.id,
          mockBulletPoint.id,
          mockUpdateBulletPointDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteBulletPoint', () => {
    it('calls the service to delete a bullet point. -> OK', async () => {
      bulletPointRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = await adminService.deleteBulletPoint(
        mockUser.id,
        mockBulletPoint.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
    it('calls the service to delete a bullet point but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.deleteBulletPoint(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockBulletPoint.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to delete a bullet point but the bullet point is not found. -> KO', async () => {
      mockDeleteResult.affected = 0;
      bulletPointRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = async () => {
        await adminService.deleteBulletPoint(
          mockUser.id,
          mockBulletPoint.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getTags', () => {
    it('calls the service to get a tag. -> OK', async () => {
      mockTagDtolist.forEach(
        (mockTagAux) => (mockTagAux.workExperience = mockWorkExperience.id),
      );
      tagRepository.findTagByWorkExperiences.mockResolvedValue(mockTagList);
      const result = await adminService.getTags(mockUser.id, mockUser);
      expect(result).toEqual(mockTagDtolist);
    });
    it('calls the service to get the tags but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.getTags(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to get the interests but the tags are not found. -> KO', async () => {
      tagRepository.findTagByWorkExperiences.mockResolvedValue([]);
      const result = async () => {
        await adminService.getTags(mockUser.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTag', () => {
    it('calls the service to create a tag. -> OK', async () => {
      mockTagDto = TagDtoFactory.build(mockTag);
      tagRepository.createTag.mockResolvedValue(mockTag);
      const result = await adminService.createTag(
        mockUser.id,
        mockCreateTagDto,
        mockUser,
      );
      expect(result).toEqual(mockTagDto);
    });
    it('calls the service to create a tag but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.createTag(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockCreateTagDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('updateTag', () => {
    it('calls the service to update a tag. -> OK', async () => {
      mockTagDto = TagDtoFactory.build(mockTag);
      tagRepository.updateTag.mockResolvedValue(mockTag);
      tagRepository.findOneBy.mockResolvedValue(mockTag);
      const result = await adminService.updateTag(
        mockUser.id,
        mockTag.id,
        mockUpdateTagDto,
        mockUser,
      );
      expect(result).toEqual(mockTagDto);
    });
    it('calls the service to update a tag but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.updateTag(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockTag.id,
          mockUpdateTagDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to update a tag but the interest is not found. -> KO', async () => {
      tagRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await adminService.updateTag(
          mockUser.id,
          mockTag.id,
          mockUpdateTagDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteTag', () => {
    it('calls the service to delete a tag. -> OK', async () => {
      tagRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = await adminService.deleteTag(
        mockUser.id,
        mockTag.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
    it('calls the service to delete a tag but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.deleteTag(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockEducation.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to delete a tag but the interest is not found. -> KO', async () => {
      mockDeleteResult.affected = 0;
      tagRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = async () => {
        await adminService.deleteTag(mockUser.id, mockTag.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('getTechnologies', () => {
    it('calls the service to get a technologies. -> OK', async () => {
      projectRepository.findProjectsByUserId.mockResolvedValue(mockProjectList);
      technologyRepository.findTechnologyByProjects.mockResolvedValue(
        mockTechnologyList,
      );
      const result = await adminService.getTechnologies(mockUser.id, mockUser);
      expect(result).toEqual(mockTechnologyDtoList);
    });
    it('calls the service to get the technologies but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.getTechnologies(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to get the technologies but the projects are not found. -> KO', async () => {
      projectRepository.findProjectsByUserId.mockResolvedValue([]);
      const result = async () => {
        await adminService.getTechnologies(mockUser.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
    it('calls the service to get the technologies but the technologies are not found. -> KO', async () => {
      projectRepository.findProjectsByUserId.mockResolvedValue(mockProjectList);
      technologyRepository.findTechnologyByProjects.mockResolvedValue([]);
      const result = async () => {
        await adminService.getTechnologies(mockUser.id, mockUser);
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTechnology', () => {
    it('calls the service to create a technology. -> OK', async () => {
      mockTechnologyDto = TechnologyDtoFactory.build(mockTechnology);
      technologyRepository.createTechnology.mockResolvedValue(mockTechnology);
      const result = await adminService.createTechnology(
        mockUser.id,
        mockCreateTechnologyDto,
        mockUser,
      );
      expect(result).toEqual(mockTechnologyDto);
    });
    it('calls the service to create a technology but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.createTechnology(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockCreateTechnologyDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('updateTechnology', () => {
    it('calls the service to update a technology. -> OK', async () => {
      mockTechnologyDto = TechnologyDtoFactory.build(mockTechnology);
      technologyRepository.updateTechnology.mockResolvedValue(mockTechnology);
      technologyRepository.findOneBy.mockResolvedValue(mockTechnology);
      const result = await adminService.updateTechnology(
        mockUser.id,
        mockTechnology.id,
        mockUpdateTechnologyDto,
        mockUser,
      );
      expect(result).toEqual(mockTechnologyDto);
    });
    it('calls the service to update a technology but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.updateTechnology(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockTechnology.id,
          mockUpdateTechnologyDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to update a technology but the technology is not found. -> KO', async () => {
      technologyRepository.findOneBy.mockResolvedValue(null);
      const result = async () => {
        await adminService.updateTechnology(
          mockUser.id,
          mockTechnology.id,
          mockUpdateTechnologyDto,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteTechnology', () => {
    it('calls the service to delete a technology. -> OK', async () => {
      technologyRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = await adminService.deleteTechnology(
        mockUser.id,
        mockTechnology.id,
        mockUser,
      );
      expect(result).toBeUndefined();
    });
    it('calls the service to delete a technology but the user is not authorized. -> KO', async () => {
      const result = async () => {
        await adminService.deleteTechnology(
          'ff5d8359-b6f7-4a08-893f-fbdbb53a79b3',
          mockTechnology.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
    it('calls the service to delete a technology but the education is not found. -> KO', async () => {
      mockDeleteResult.affected = 0;
      technologyRepository.delete.mockResolvedValue(mockDeleteResult);
      const result = async () => {
        await adminService.deleteTechnology(
          mockUser.id,
          mockTechnology.id,
          mockUser,
        );
      };
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
