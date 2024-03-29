import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from '../../models/dto/admin/update-user.dto';
import { User } from '../../repositories/entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { UserDto } from '../../models/dto/user.dto';
import { EducationRepository } from '../../repositories/education.repository';
import { EducationDto } from '../../models/dto/education.dto';
import { CreateEducationDto } from '../../models/dto/admin/create-education.dto';
import { UpdateEducationDto } from '../../models/dto/admin/update-education.dto';
import { WorkExperienceDto } from '../../models/dto/work-experience.dto';
import { WorkExperienceRepository } from '../../repositories/work-experience.repository';
import { CreateWorkExperienceDto } from '../../models/dto/admin/create-work-experience.dto';
import { ProjectDto } from '../../models/dto/project.dto';
import { ProjectRepository } from '../../repositories/project.repository';
import { CreateProjectDto } from '../../models/dto/admin/create-project.dto';
import { CreateSkillDto } from '../../models/dto/admin/create-skill.dto';
import { SkillRepository } from '../../repositories/skill.repository';
import { SkillDto } from '../../models/dto/skill.dto';
import { ContactDto } from '../../models/dto/contact.dto';
import { CreateContactDto } from '../../models/dto/admin/create-contact.dto';
import { ContactRepository } from '../../repositories/contact.repository';
import { CreateBulletPointDto } from '../../models/dto/admin/create-bullet-point.dto';
import { BulletPointDto } from '../../models/dto/bullet-point.dto';
import { BulletPointRepository } from '../../repositories/bullet-point.repository';
import { InterestDto } from '../../models/dto/interest.dto';
import { CreateInterestDto } from '../../models/dto/admin/create-interest.dto';
import { InterestRepository } from '../../repositories/interest.repository';
import { CreateTechnologyDto } from '../../models/dto/admin/create-technology.dto';
import { TechnologyDto } from '../../models/dto/technology.dto';
import { TechnologyRepository } from '../../repositories/technology.repository';
import { UpdateWorkExperienceDto } from '../../models/dto/admin/update-work-experience.dto';
import { UpdateProjectDto } from '../../models/dto/admin/update-project.dto';
import { UpdateSkillDto } from '../../models/dto/admin/update-skill.dto';
import { UpdateContactDto } from '../../models/dto/admin/update-contact.dto';
import { UpdateBulletPointDto } from '../../models/dto/admin/update-bullet-point.dto';
import { UpdateInterestDto } from '../../models/dto/admin/update-interest.dto';
import { UpdateTechnologyDto } from '../../models/dto/admin/update-technology.dto';
import { BulletPoint } from '../../repositories/entities/bullet-point.entity';

@Injectable()
export class AdminService {
  private logger = new Logger('AdminService', { timestamp: true });

  constructor(
    private readonly userRepository: UserRepository,
    private readonly educationRepository: EducationRepository,
    private readonly workExperienceRepository: WorkExperienceRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly skillRepository: SkillRepository,
    private readonly contactRepository: ContactRepository,
    private readonly bulletPointRepository: BulletPointRepository,
    private readonly interestRepository: InterestRepository,
    private readonly technologyRepository: TechnologyRepository,
  ) {}

  async getUser(id: string, user: User): Promise<UserDto> {
    this.logger.verbose(
      `Checking if the user that gets is the same to the one that is getting. user: ${user.id} userGetting: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can get user with ID "${id}"`,
      );

    this.logger.verbose(`Getting the user with id`);
    const userFound = await this.userRepository.findOneBy({ id: user.id });

    this.logger.verbose(`Creating the user DTO of the user. ID: ${id}`);
    const userDto = new UserDto();
    userDto.id = userFound.id;
    userDto.username = userFound.username;
    userDto.firstName = userFound.firstName;
    userDto.lastName = userFound.lastName;
    userDto.dateOfBirth = userFound.dateOfBirth;
    userDto.aboutMe = userFound.aboutMe;

    const interests = userFound.interests.map((interest) => {
      const interestAux = new InterestDto();
      interestAux.id = interest.id;
      return interestAux;
    });
    userDto.interests = interests;

    const educations = userFound.educations.map((education) => {
      const educationAux = new EducationDto();
      educationAux.id = education.id;
      return educationAux;
    });
    userDto.educations = educations;

    const workExperiences = userFound.workExperiences.map((workExperience) => {
      const workExperienceAux = new WorkExperienceDto();
      workExperienceAux.id = workExperience.id;
      return workExperienceAux;
    });
    userDto.workExperiences = workExperiences;

    const skills = userFound.skills.map((skill) => {
      const skillAux = new SkillDto();
      skillAux.id = skill.id;
      return skillAux;
    });
    userDto.skills = skills;

    const projects = userFound.projects.map((project) => {
      const projectAux = new ProjectDto();
      projectAux.id = project.id;
      return projectAux;
    });
    userDto.projects = projects;

    const contact = new ContactDto();
    contact.id = userFound.contact?.id;
    userDto.contact = contact;

    return userDto;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    user: User,
  ): Promise<UserDto> {
    this.logger.verbose(
      `Checking if the user that edits is the same to the one that is been edited. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not edit user with ID "${id}"`,
      );

    this.logger.verbose(`Updating the user with the new information`);
    const userUpdated = await this.userRepository.updateUser(
      user,
      updateUserDto,
    );

    this.logger.verbose(`Creating the user DTO of the user. ID: ${id}`);
    const userDto = new UserDto();
    userDto.id = userUpdated.id;
    userDto.username = userUpdated.username;
    userDto.firstName = userUpdated.firstName;
    userDto.lastName = userUpdated.lastName;
    userDto.dateOfBirth = userUpdated.dateOfBirth;
    userDto.aboutMe = userUpdated.aboutMe;

    return userDto;
  }

  async getEducations(id: string, user: User): Promise<EducationDto[]> {
    this.logger.verbose(
      `Checking if the user that gets is the same to the one that is getting. user: ${user.id} userGetting: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not get user with ID "${id}"`,
      );

    this.logger.verbose(`Retrieving the education by user ID. ID: ${id}`);
    const education = await this.educationRepository.findEducationByUserId(id);

    if (!education.length)
      throw new NotFoundException(
        `There is no education for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating the educations DTO of the user. ID: ${id}`);
    const educationDtoList: EducationDto[] = [];
    education.forEach((educationItem) => {
      const educationDto = new EducationDto();
      educationDto.id = educationItem.id;
      educationDto.courseName = educationItem.courseName;
      educationDto.typeOfDegree = educationItem.typeOfDegree;
      educationDto.institute = educationItem.institute;
      educationDto.startDate = educationItem.startDate;
      educationDto.endDate = educationItem.endDate;
      educationDto.grade = educationItem.grade;
      educationDto.user = id;

      educationDtoList.push(educationDto);
    });

    return educationDtoList;
  }

  async createEducation(
    id: string,
    createEducationDto: CreateEducationDto,
    user: User,
  ): Promise<EducationDto> {
    this.logger.verbose(
      `Checking if the user that creates is the same to the one that education will be created. user: ${user.id} userToAddEducation: ${id}`,
    );

    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not create education for user with ID "${id}"`,
      );

    this.logger.verbose(`Creating a new education`);
    const educationCreated = await this.educationRepository.createEducation(
      id,
      createEducationDto,
    );

    this.logger.verbose(`Creating the education DTO of the user. ID: ${id}`);
    const educationDto = new EducationDto();
    educationDto.id = educationCreated.id;
    educationDto.courseName = educationCreated.courseName;
    educationDto.typeOfDegree = educationCreated.typeOfDegree;
    educationDto.institute = educationCreated.institute;
    educationDto.startDate = educationCreated.startDate;
    educationDto.endDate = educationCreated.endDate;
    educationDto.grade = educationCreated.grade;
    educationDto.user = educationCreated.user.id;

    return educationDto;
  }

  async updateEducation(
    id: string,
    idEducation: string,
    updateEducationDto: UpdateEducationDto,
    user: User,
  ): Promise<EducationDto> {
    this.logger.verbose(
      `Checking if the user that edits is the same to the one that education will be edited. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not edit education of the user with ID "${id}"`,
      );

    const education = await this.educationRepository.findOneBy({
      id: idEducation,
      user: { id },
    });

    if (!education)
      throw new NotFoundException(
        `User with ID "${id}" has no education assigned with ID "${idEducation}"`,
      );

    this.logger.verbose(`Updating the education with the new information`);
    const educationUpdated = await this.educationRepository.updateEducation(
      education,
      updateEducationDto,
    );

    this.logger.verbose(
      `Creating the education updated DTO of the user. ID: ${id}`,
    );
    const educationDto = new EducationDto();
    educationDto.id = educationUpdated.id;
    educationDto.courseName = educationUpdated.courseName;
    educationDto.typeOfDegree = educationUpdated.typeOfDegree;
    educationDto.institute = educationUpdated.institute;
    educationDto.startDate = educationUpdated.startDate;
    educationDto.endDate = educationUpdated.endDate;
    educationDto.grade = educationUpdated.grade;
    educationDto.user = educationUpdated.user.id;

    return educationDto;
  }

  async deleteEducation(
    id: string,
    idEducation: string,
    user: User,
  ): Promise<void> {
    this.logger.verbose(
      `Checking if the user that deletes is the same to the one that education will be deleted. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not delete education of user with ID "${id}"`,
      );

    const result = await this.educationRepository.delete({
      id: idEducation,
      user: { id },
    });

    if (result.affected === 0)
      throw new NotFoundException(`Education with ID "${id}" not found`);

    return this.logger.verbose(
      `Education deleted successfully for the user. ID: ${id}`,
    );
  }

  async getWorkExperiences(
    id: string,
    user: User,
  ): Promise<WorkExperienceDto[]> {
    this.logger.verbose(
      `Checking if the user that gets is the same to the one that is getting. user: ${user.id} userGetting: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not get user with ID "${id}"`,
      );

    this.logger.verbose(`Retrieving the work experience by user ID. ID: ${id}`);
    const workExperience =
      await this.workExperienceRepository.findWorkExperienceByUserId(id);

    if (!workExperience.length)
      throw new NotFoundException(
        `There is no work experience for the user with ID "${id}"`,
      );

    this.logger.verbose(
      `Creating the work experience DTO of the user. ID: ${id}`,
    );
    const workExperienceDtoList: WorkExperienceDto[] = [];
    workExperience.forEach((workExperienceItem) => {
      const workExperienceDto = new WorkExperienceDto();
      workExperienceDto.id = workExperienceItem.id;
      workExperienceDto.role = workExperienceItem.role;
      workExperienceDto.company = workExperienceItem.company;
      workExperienceDto.startDate = workExperienceItem.startDate;
      workExperienceDto.endDate = workExperienceItem.endDate;

      const bulletPoints = workExperienceItem.bulletPoints.map(
        (bulletPoint) => bulletPoint.bulletPoint,
      );
      workExperienceDto.bulletPoints = bulletPoints;
      workExperienceDto.user = id;

      workExperienceDtoList.push(workExperienceDto);
    });

    return workExperienceDtoList;
  }

  async createWorkExperience(
    id: string,
    createWorkExperienceDto: CreateWorkExperienceDto,
    user: User,
  ): Promise<WorkExperienceDto> {
    this.logger.verbose(
      `Checking if the user that creates is the same to the one that work experience will be created. user: ${user.id} userToAddWorkExperience: ${id}`,
    );

    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not create work experience for user with ID "${id}"`,
      );

    this.logger.verbose(`Creating a new work experience`);
    const workExperienceCreated =
      await this.workExperienceRepository.createWorkExperience(
        id,
        createWorkExperienceDto,
      );

    this.logger.verbose(
      `Creating the work experience DTO of the user. ID: ${id}`,
    );
    const workExperienceDto = new WorkExperienceDto();
    workExperienceDto.id = workExperienceCreated.id;
    workExperienceDto.role = workExperienceCreated.role;
    workExperienceDto.company = workExperienceCreated.company;
    workExperienceDto.startDate = workExperienceCreated.startDate;
    workExperienceDto.endDate = workExperienceCreated.endDate;
    workExperienceDto.user = workExperienceCreated.user.id;

    return workExperienceDto;
  }

  async updateWorkExperience(
    id: string,
    idWorkExperience: string,
    updateWorkExperienceDto: UpdateWorkExperienceDto,
    user: User,
  ): Promise<WorkExperienceDto> {
    this.logger.verbose(
      `Checking if the user that edits is the same to the one that work experience will be edited. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not edit work experience of the user with ID "${id}"`,
      );

    const workExperience = await this.workExperienceRepository.findOneBy({
      id: idWorkExperience,
      user: { id },
    });

    if (!workExperience)
      throw new NotFoundException(
        `User with ID "${id}" has no work experience assigned with ID "${idWorkExperience}"`,
      );

    this.logger.verbose(
      `Updating the work experience with the new information`,
    );
    const workExperienceUpdated =
      await this.workExperienceRepository.updateWorkExperience(
        workExperience,
        updateWorkExperienceDto,
      );

    this.logger.verbose(
      `Creating the work experience updated DTO of the user. ID: ${id}`,
    );
    const workExperienceDto = new WorkExperienceDto();
    workExperienceDto.id = workExperienceUpdated.id;
    workExperienceDto.role = workExperienceUpdated.role;
    workExperienceDto.company = workExperienceUpdated.company;
    workExperienceDto.startDate = workExperienceUpdated.startDate;
    workExperienceDto.endDate = workExperienceUpdated.endDate;
    workExperienceDto.user = workExperienceUpdated.user.id;

    return workExperienceDto;
  }

  async deleteWorkExperience(
    id: string,
    idWorkExperience: string,
    user: User,
  ): Promise<void> {
    this.logger.verbose(
      `Checking if the user that deletes is the same to the one that work experience will be deleted. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not delete work experience of user with ID "${id}"`,
      );

    const result = await this.workExperienceRepository.delete({
      id: idWorkExperience,
      user: { id },
    });

    if (result.affected === 0)
      throw new NotFoundException(`Work experience with ID "${id}" not found`);

    return this.logger.verbose(
      `Work experience deleted successfully for the user. ID: ${id}`,
    );
  }

  async getProjects(id: string, user: User): Promise<ProjectDto[]> {
    this.logger.verbose(
      `Checking if the user that gets is the same to the one that is getting. user: ${user.id} userGetting: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not get user with ID "${id}"`,
      );

    this.logger.verbose(`Retrieving the project by user ID. ID: ${id}`);
    const project = await this.projectRepository.findProjectsByUserId(id);
    if (!project.length)
      throw new NotFoundException(
        `There is no project for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating the project DTO of the user. ID: ${id}`);
    const projectDtoList: ProjectDto[] = [];
    project.forEach((projectItem) => {
      const projectDto = new ProjectDto();
      projectDto.id = projectItem.id;
      projectDto.projectName = projectItem.projectName;

      const technologies = projectItem.technologies.map(
        (technology) => technology.technologyName,
      );
      projectDto.technologies = technologies;

      const bulletPoints = projectItem.bulletPoints.map(
        (bulletPoint) => bulletPoint.bulletPoint,
      );
      projectDto.bulletPoints = bulletPoints;
      projectDto.user = id;

      projectDtoList.push(projectDto);
    });

    return projectDtoList;
  }

  async createProject(
    id: string,
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<ProjectDto> {
    this.logger.verbose(
      `Checking if the user that creates is the same to the one that project will be created. user: ${user.id} userToProject: ${id}`,
    );

    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not create project for user with ID "${id}"`,
      );

    this.logger.verbose(`Creating a project`);
    const projectCreated = await this.projectRepository.createProject(
      id,
      createProjectDto,
    );

    this.logger.verbose(`Creating the project DTO of the user. ID: ${id}`);
    const projectDto = new ProjectDto();
    projectDto.id = projectCreated.id;
    projectDto.projectName = projectCreated.projectName;
    projectDto.user = projectCreated.user.id;

    return projectDto;
  }

  async updateProject(
    id: string,
    idProject: string,
    updateProjectDto: UpdateProjectDto,
    user: User,
  ): Promise<ProjectDto> {
    this.logger.verbose(
      `Checking if the user that edits is the same to the one that project will be edited. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not edit project of the user with ID "${id}"`,
      );

    const project = await this.projectRepository.findOneBy({
      id: idProject,
      user: { id },
    });

    if (!project)
      throw new NotFoundException(
        `User with ID "${id}" has no project assigned with ID "${idProject}"`,
      );

    this.logger.verbose(`Updating the project with the new information`);
    const projectUpdated = await this.projectRepository.updateProject(
      project,
      updateProjectDto,
    );

    this.logger.verbose(
      `Creating the project updated DTO of the user. ID: ${id}`,
    );
    const projectDto = new ProjectDto();
    projectDto.id = projectUpdated.id;
    projectDto.projectName = projectUpdated.projectName;
    projectDto.user = projectUpdated.user.id;

    return projectDto;
  }

  async deleteProject(
    id: string,
    idProject: string,
    user: User,
  ): Promise<void> {
    this.logger.verbose(
      `Checking if the user that deletes is the same to the one that project will be deleted. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not delete project of user with ID "${id}"`,
      );

    const result = await this.projectRepository.delete({
      id: idProject,
      user: { id },
    });

    if (result.affected === 0)
      throw new NotFoundException(`Project with ID "${id}" not found`);

    return this.logger.verbose(
      `Project deleted successfully for the user. ID: ${id}`,
    );
  }

  async getSkills(id: string, user: User): Promise<SkillDto[]> {
    this.logger.verbose(
      `Checking if the user that gets is the same to the one that is getting. user: ${user.id} userGetting: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not get user with ID "${id}"`,
      );

    this.logger.verbose(`Retrieving the skill by user ID. ID: ${id}`);
    const skill = await this.skillRepository.findSkillsByUserId(id);
    if (!skill.length)
      throw new NotFoundException(
        `There is no skill for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating the skill DTO of the user. ID: ${id}`);
    const skillDtoList: SkillDto[] = [];
    skill.forEach((skillItem) => {
      const skillDto = new SkillDto();
      skillDto.id = skillItem.id;
      skillDto.skillName = skillItem.skillName;
      skillDto.level = skillItem.level;
      skillDto.rating = skillItem.rating;
      skillDto.user = id;

      skillDtoList.push(skillDto);
    });

    return skillDtoList;
  }

  async createSkill(
    id: string,
    createSkillDto: CreateSkillDto,
    user: User,
  ): Promise<SkillDto> {
    this.logger.verbose(
      `Checking if the user that creates is the same to the one that skill will be created. user: ${user.id} userToSkill: ${id}`,
    );

    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not create skill for user with ID "${id}"`,
      );

    this.logger.verbose(`Creating a skill`);
    const skillCreated = await this.skillRepository.createSkill(
      id,
      createSkillDto,
    );

    this.logger.verbose(`Creating the skill DTO of the user. ID: ${id}`);
    const skillDto = new SkillDto();
    skillDto.id = skillCreated.id;
    skillDto.skillName = skillCreated.skillName;
    skillDto.level = skillCreated.level;
    skillDto.rating = skillCreated.rating;
    skillDto.user = skillCreated.user.id;

    return skillDto;
  }

  async updateSkill(
    id: string,
    idSkill: string,
    updateSkillDto: UpdateSkillDto,
    user: User,
  ): Promise<SkillDto> {
    this.logger.verbose(
      `Checking if the user that edits is the same to the one that skill will be edited. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not edit skill of the user with ID "${id}"`,
      );

    const skill = await this.skillRepository.findOneBy({
      id: idSkill,
      user: { id },
    });

    if (!skill)
      throw new NotFoundException(
        `User with ID "${id}" has no skill assigned with ID "${idSkill}"`,
      );

    this.logger.verbose(`Updating the skill with the new information`);
    const skillUpdated = await this.skillRepository.updateSkill(
      skill,
      updateSkillDto,
    );

    this.logger.verbose(
      `Creating the skill updated DTO of the user. ID: ${id}`,
    );
    const skillDto = new SkillDto();
    skillDto.id = skillUpdated.id;
    skillDto.skillName = skillUpdated.skillName;
    skillDto.level = skillUpdated.level;
    skillDto.rating = skillUpdated.rating;
    skillDto.user = skillUpdated.user.id;

    return skillDto;
  }

  async deleteSkill(id: string, idSkill: string, user: User): Promise<void> {
    this.logger.verbose(
      `Checking if the user that deletes is the same to the one that skill will be deleted. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not delete skill of user with ID "${id}"`,
      );

    const result = await this.skillRepository.delete({
      id: idSkill,
      user: { id },
    });

    if (result.affected === 0)
      throw new NotFoundException(`Skill with ID "${id}" not found`);

    return this.logger.verbose(
      `Skill deleted successfully for the user. ID: ${id}`,
    );
  }

  async getContact(id: string, user: User): Promise<ContactDto> {
    this.logger.verbose(
      `Checking if the user that gets is the same to the one that is getting. user: ${user.id} userGetting: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not get user with ID "${id}"`,
      );

    this.logger.verbose(`Retrieving the contact by user ID. ID: ${id}`);
    const contact = await this.contactRepository.findContactsByUserId(id);
    if (!contact)
      throw new NotFoundException(
        `There is no contact for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating the contact DTO of the user. ID: ${id}`);
    const contactDto = new ContactDto();
    contactDto.id = contact.id;
    contactDto.email = contact.email;
    contactDto.linkedinUrl = contact.linkedinUrl;
    contactDto.githubUrl = contact.githubUrl;
    contactDto.user = id;

    return contactDto;
  }

  async createContact(
    id: string,
    createContactDto: CreateContactDto,
    user: User,
  ): Promise<ContactDto> {
    this.logger.verbose(
      `Checking if the user that creates is the same to the one that contact will be created. user: ${user.id} userToContact: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not create contact for user with ID "${id}"`,
      );

    this.logger.verbose(`Creating a project`);
    const contactCreated = await this.contactRepository.createContact(
      id,
      createContactDto,
    );

    this.logger.verbose(`Creating the contact DTO of the user. ID: ${id}`);
    const contactDto = new ContactDto();
    contactDto.id = contactCreated.id;
    contactDto.email = contactCreated.email;
    contactDto.linkedinUrl = contactCreated.linkedinUrl;
    contactDto.githubUrl = contactCreated.githubUrl;
    contactDto.user = contactCreated.user.id;

    return contactDto;
  }

  async updateContact(
    id: string,
    idContact: string,
    updateContactDto: UpdateContactDto,
    user: User,
  ): Promise<ContactDto> {
    this.logger.verbose(
      `Checking if the user that edits is the same to the one that contact will be edited. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not edit contact of the user with ID "${id}"`,
      );

    const contact = await this.contactRepository.findOneBy({
      id: idContact,
      user: { id },
    });

    if (!contact)
      throw new NotFoundException(
        `User with ID "${id}" has no contact assigned with ID "${idContact}"`,
      );

    this.logger.verbose(`Updating the contact with the new information`);
    const contactUpdated = await this.contactRepository.updateContact(
      contact,
      updateContactDto,
    );

    this.logger.verbose(
      `Creating the contact updated DTO of the user. ID: ${id}`,
    );
    const contactDto = new ContactDto();
    contactDto.id = contactUpdated.id;
    contactDto.email = contactUpdated.email;
    contactDto.githubUrl = contactUpdated.githubUrl;
    contactDto.linkedinUrl = contactUpdated.linkedinUrl;
    contactDto.user = contactUpdated.user.id;

    return contactDto;
  }

  async deleteContact(
    id: string,
    idContact: string,
    user: User,
  ): Promise<void> {
    this.logger.verbose(
      `Checking if the user that deletes is the same to the one that contact will be deleted. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not delete contact of user with ID "${id}"`,
      );

    const result = await this.contactRepository.delete({
      id: idContact,
      user: { id },
    });

    if (result.affected === 0)
      throw new NotFoundException(`Contact with ID "${id}" not found`);

    return this.logger.verbose(
      `Contact deleted successfully for the user. ID: ${id}`,
    );
  }

  async getBulletPoints(id: string, user: User): Promise<BulletPointDto[]> {
    this.logger.verbose(
      `Checking if the user that gets is the same to the one that is getting. user: ${user.id} userGetting: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not get user with ID "${id}"`,
      );

    this.logger.verbose(`Retrieving the projects by user ID. ID: ${id}`);
    const projects = await this.projectRepository.findProjectsByUserId(id);

    this.logger.verbose(`Retrieving the projects by user ID. ID: ${id}`);
    const workExperiences =
      await this.workExperienceRepository.findWorkExperienceByUserId(id);

    if (!projects.length && !workExperiences.length)
      throw new NotFoundException(
        `There is no projects or work experiences for the user with ID "${id}`,
      );

    this.logger.verbose(`Retrieving the bullet point by user ID. ID: ${id}`);
    const bulletPoints: BulletPoint[] = [];
    if (projects.length) {
      const bulletPointsProject =
        await this.bulletPointRepository.findBulletPointByProjects(projects);
      bulletPointsProject.forEach((bulletPointProject) =>
        bulletPoints.push(bulletPointProject),
      );
    }

    if (workExperiences.length) {
      const bulletPointsWorkExperiences =
        await this.bulletPointRepository.findBulletPointByWorkExperiences(
          workExperiences,
        );
      bulletPointsWorkExperiences.forEach((bulletPointWorkExperience) =>
        bulletPoints.push(bulletPointWorkExperience),
      );
    }

    if (!bulletPoints.length)
      throw new NotFoundException(
        `There is no bullet point for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating the bullet point DTO of the user. ID: ${id}`);
    const bulletPointDtoList: BulletPointDto[] = [];
    bulletPoints.forEach((bulletPointItem) => {
      const bulletPointDto = new BulletPointDto();
      bulletPointDto.id = bulletPointItem.id;
      bulletPointDto.bulletPoint = bulletPointItem.bulletPoint;
      bulletPointDto.project = bulletPointItem.project?.id;
      bulletPointDto.workExperience = bulletPointItem.workExperience?.id;

      bulletPointDtoList.push(bulletPointDto);
    });

    return bulletPointDtoList;
  }

  async createBulletPoint(
    id: string,
    createBulletPointDto: CreateBulletPointDto,
    user: User,
  ): Promise<BulletPointDto> {
    this.logger.verbose(
      `Checking if the user that creates is the same to the one that bullet point will be created. user: ${user.id} userToBulletPoint: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not create bullet point for user with ID "${id}"`,
      );

    const { project, workExperience } = createBulletPointDto;
    this.logger.verbose(
      `Checking if the bullet point has any assigned project, work experience or both. idProject: ${project} idWorkExperience: ${workExperience}`,
    );
    if ((project && workExperience) || (!project && !workExperience))
      throw new BadRequestException(
        `A bullet point must be assigned to only one project or work experience. idProject: ${project} idWorkExperience: ${workExperience}`,
      );

    this.logger.verbose(`Creating a bullet point`);
    const bulletPointCreated =
      await this.bulletPointRepository.createBulletPoint(
        id,
        createBulletPointDto,
      );

    this.logger.verbose(`Creating the bullet point DTO of the user. ID: ${id}`);
    const bulletPointDto = new BulletPointDto();
    bulletPointDto.id = bulletPointCreated.id;
    bulletPointDto.bulletPoint = bulletPointCreated.bulletPoint;
    bulletPointDto.workExperience = bulletPointCreated.workExperience?.id;
    bulletPointDto.project = bulletPointCreated.project?.id;

    return bulletPointDto;
  }

  async updateBulletPoint(
    id: string,
    idBulletPoint: string,
    updateBulletPointDto: UpdateBulletPointDto,
    user: User,
  ): Promise<BulletPointDto> {
    this.logger.verbose(
      `Checking if the user that edits is the same to the one that bullet point will be edited. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not edit bullet point of the user with ID "${id}"`,
      );

    const bulletPoint = await this.bulletPointRepository.findOneBy({
      id: idBulletPoint,
    });

    if (!bulletPoint)
      throw new NotFoundException(
        `User with ID "${id}" has no bullet point assigned with ID "${idBulletPoint}"`,
      );

    this.logger.verbose(`Updating the bullet point with the new information`);
    const bulletPointUpdated =
      await this.bulletPointRepository.updateBulletPoint(
        bulletPoint,
        updateBulletPointDto,
      );

    this.logger.verbose(
      `Creating the bullet point updated DTO of the user. ID: ${id}`,
    );
    const bulletPointDto = new BulletPointDto();
    bulletPointDto.id = bulletPointUpdated.id;
    bulletPointDto.bulletPoint = bulletPointUpdated.bulletPoint;
    bulletPointDto.workExperience = bulletPointUpdated.workExperience?.id;
    bulletPointDto.project = bulletPointUpdated.project?.id;

    return bulletPointDto;
  }

  async deleteBulletPoint(
    id: string,
    idBulletPoint: string,
    user: User,
  ): Promise<void> {
    this.logger.verbose(
      `Checking if the user that deletes is the same to the one that bullet point will be deleted. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not delete bullet point of user with ID "${id}"`,
      );

    const result = await this.bulletPointRepository.delete({
      id: idBulletPoint,
    });

    if (result.affected === 0)
      throw new NotFoundException(`Bullet point with ID "${id}" not found`);

    return this.logger.verbose(
      `Bullet point deleted successfully for the user. ID: ${id}`,
    );
  }

  async getInterests(id: string, user: User): Promise<InterestDto[]> {
    this.logger.verbose(
      `Checking if the user that gets is the same to the one that is getting. user: ${user.id} userGetting: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not get user with ID "${id}"`,
      );

    this.logger.verbose(`Retrieving the interest by user ID. ID: ${id}`);
    const interest = await this.interestRepository.findInterestByUserId(id);
    if (!interest.length)
      throw new NotFoundException(
        `There is no interest for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating the interest DTO of the user. ID: ${id}`);
    const interestDtoList: InterestDto[] = [];
    interest.forEach((interestItem) => {
      const interestDto = new InterestDto();
      interestDto.id = interestItem.id;
      interestDto.interestName = interestItem.interestName;
      interestDto.user = id;

      interestDtoList.push(interestDto);
    });

    return interestDtoList;
  }

  async createInterest(
    id: string,
    createInterestDto: CreateInterestDto,
    user: User,
  ): Promise<InterestDto> {
    this.logger.verbose(
      `Checking if the user that creates is the same to the one that interest will be created. user: ${user.id} userToInterest: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not create interest for user with ID "${id}"`,
      );

    this.logger.verbose(`Creating a interest`);
    const interestCreated = await this.interestRepository.createInterest(
      id,
      createInterestDto,
    );

    this.logger.verbose(`Creating the interest DTO of the user. ID: ${id}`);
    const interestDto = new InterestDto();
    interestDto.id = interestCreated.id;
    interestDto.interestName = interestCreated.interestName;
    interestDto.user = interestCreated.user.id;

    return interestDto;
  }

  async updateInterest(
    id: string,
    idInterest: string,
    updateInterestDto: UpdateInterestDto,
    user: User,
  ): Promise<InterestDto> {
    this.logger.verbose(
      `Checking if the user that edits is the same to the one that interest will be edited. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not edit interest of the user with ID "${id}"`,
      );

    const interest = await this.interestRepository.findOneBy({
      id: idInterest,
      user: { id },
    });

    if (!interest)
      throw new NotFoundException(
        `User with ID "${id}" has no interest assigned with ID "${idInterest}"`,
      );

    this.logger.verbose(`Updating the interest with the new information`);
    const interestUpdated = await this.interestRepository.updateInterest(
      interest,
      updateInterestDto,
    );

    this.logger.verbose(
      `Creating the interest updated DTO of the user. ID: ${id}`,
    );
    const interestDto = new InterestDto();
    interestDto.id = interestUpdated.id;
    interestDto.interestName = interestUpdated.interestName;
    interestDto.user = interestUpdated.user.id;

    return interestDto;
  }

  async deleteInterest(
    id: string,
    idInterest: string,
    user: User,
  ): Promise<void> {
    this.logger.verbose(
      `Checking if the user that deletes is the same to the one that interest will be deleted. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not delete interest of user with ID "${id}"`,
      );

    const result = await this.interestRepository.delete({
      id: idInterest,
      user: { id },
    });

    if (result.affected === 0)
      throw new NotFoundException(`Interest with ID "${id}" not found`);

    return this.logger.verbose(
      `Interest deleted successfully for the user. ID: ${id}`,
    );
  }

  async getTechnologies(id: string, user: User): Promise<TechnologyDto[]> {
    this.logger.verbose(
      `Checking if the user that gets is the same to the one that is getting. user: ${user.id} userGetting: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not get user with ID "${id}"`,
      );

    this.logger.verbose(`Retrieving the projects by user ID. ID: ${id}`);
    const projects = await this.projectRepository.findProjectsByUserId(id);

    if (!projects.length)
      throw new NotFoundException(
        `There is no projects for the user with ID "${id}"`,
      );

    this.logger.verbose(`Retrieving the technology by user ID. ID: ${id}`);
    const technology =
      await this.technologyRepository.findTechnologyByProjects(projects);
    if (!technology.length)
      throw new NotFoundException(
        `There is no technology for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating the technology DTO of the user. ID: ${id}`);
    const technologyDtoList: TechnologyDto[] = [];
    technology.forEach((technologyItem) => {
      const technologyDto = new TechnologyDto();
      technologyDto.id = technologyItem.id;
      technologyDto.technologyName = technologyItem.technologyName;
      technologyDto.project = technologyItem.project.id;

      technologyDtoList.push(technologyDto);
    });

    return technologyDtoList;
  }

  async createTechnology(
    id: string,
    createTechnologyDto: CreateTechnologyDto,
    user: User,
  ): Promise<TechnologyDto> {
    this.logger.verbose(
      `Checking if the user that creates is the same to the one that technology will be created. user: ${user.id} userToTechnology: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not create technology for user with ID "${id}"`,
      );

    this.logger.verbose(`Creating a technology`);
    const technologyCreated = await this.technologyRepository.createTechnology(
      id,
      createTechnologyDto,
    );

    this.logger.verbose(`Creating the technology DTO of the user. ID: ${id}`);
    const technologyDto = new TechnologyDto();
    technologyDto.id = technologyCreated.id;
    technologyDto.technologyName = technologyCreated.technologyName;
    technologyDto.project = technologyCreated.project.id;

    return technologyDto;
  }

  async updateTechnology(
    id: string,
    idTechnology: string,
    updateTechnologyDto: UpdateTechnologyDto,
    user: User,
  ): Promise<TechnologyDto> {
    this.logger.verbose(
      `Checking if the user that edits is the same to the one that technology will be edited. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not edit technology of the user with ID "${id}"`,
      );

    const technology = await this.technologyRepository.findOneBy({
      id: idTechnology,
    });

    if (!technology)
      throw new NotFoundException(
        `User with ID "${id}" has no technology assigned with ID "${idTechnology}"`,
      );

    this.logger.verbose(`Updating the technology with the new information`);
    const technologyUpdated = await this.technologyRepository.updateTechnology(
      technology,
      updateTechnologyDto,
    );

    this.logger.verbose(
      `Creating the technology updated DTO of the user. ID: ${id}`,
    );
    const interestDto = new TechnologyDto();
    interestDto.id = technologyUpdated.id;
    interestDto.technologyName = technologyUpdated.technologyName;
    interestDto.project = technologyUpdated.project.id;

    return interestDto;
  }

  async deleteTechnology(
    id: string,
    idTechnology: string,
    user: User,
  ): Promise<void> {
    this.logger.verbose(
      `Checking if the user that deletes is the same to the one that technology will be deleted. user: ${user.id} userEdited: ${id}`,
    );
    if (user.id !== id)
      throw new UnauthorizedException(
        `User with ID "${user.id}" can not delete technology of user with ID "${id}"`,
      );

    const result = await this.technologyRepository.delete({
      id: idTechnology,
    });

    if (result.affected === 0)
      throw new NotFoundException(`Technology with ID "${id}" not found`);

    return this.logger.verbose(
      `Technology deleted successfully for the user. ID: ${id}`,
    );
  }
}
