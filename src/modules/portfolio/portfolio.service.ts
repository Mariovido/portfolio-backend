import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { EducationRepository } from '../../repositories/education.repository';
import { WorkExperienceRepository } from '../../repositories/work-experience.repository';
import { SkillRepository } from '../../repositories/skill.repository';
import { ProjectRepository } from '../../repositories/project.repository';
import { ContactRepository } from '../../repositories/contact.repository';
import { PersonalInformationDto } from '../../models/dto/portfolio/personal-information.dto';
import { EducationPortfolioDto } from '../../models/dto/portfolio/education-portfolio.dto';
import { WorkExperiencePortfolioDto } from '../../models/dto/portfolio/work-experience.dto';
import { SkillPortfolioDto } from '../../models/dto/portfolio/skill-portfolio.dto';
import { ProjectPortfolioDto } from '../../models/dto/portfolio/project-portfolio.dto';
import { ContactPortfolioDto } from '../../models/dto/portfolio/contact-portfolio.dto';
import { BannerDto } from '../../models/dto/portfolio/banner.dto';
import { calculateWorkExperience } from '../../utils/portfolio.utils';

@Injectable()
export class PortfolioService {
  private logger = new Logger('PortfolioService', { timestamp: true });

  constructor(
    private readonly userRepository: UserRepository,
    private readonly educationRepository: EducationRepository,
    private readonly workExperienceRepository: WorkExperienceRepository,
    private readonly skillRepository: SkillRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly contactRepository: ContactRepository,
  ) {}

  async getPersonalInformation(id: string): Promise<PersonalInformationDto> {
    this.logger.verbose(`Retrieving the user by ID. ID: ${id}`);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with ID "${id}" not found`);

    this.logger.verbose(
      `Creating the personal information DTO of the user. ID: ${id}`,
    );
    const fullName = `${user.firstName} ${user.lastName}`;

    const { years, months } = calculateWorkExperience(user.workExperiences);
    const workExperience = `${years} years, ${months} months`;

    const education = user.educations.slice().sort(function (a, b) {
      return b.startDate.getFullYear() - a.startDate.getFullYear();
    })[0]?.typeOfDegree;

    const interests = user.interests.map((interest) => interest.interestName);

    const personalInformation = new PersonalInformationDto();
    personalInformation.fullName = fullName;
    personalInformation.dateOfBirth = user.dateOfBirth;
    personalInformation.workExperience = workExperience;
    personalInformation.education = education;
    personalInformation.interests = interests;
    personalInformation.aboutMe = user.aboutMe;

    return personalInformation;
  }

  async getEducation(id: string): Promise<EducationPortfolioDto[]> {
    this.logger.verbose(`Retrieving the education by user ID. ID: ${id}`);
    const education = await this.educationRepository.findEducationByUserId(id);

    if (!education.length)
      throw new NotFoundException(
        `There is no education for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating education DTO of the user. ID: ${id}`);
    const educationPortfolioList: EducationPortfolioDto[] = [];
    education.forEach((educationItem) => {
      const educationPortfolioDto = new EducationPortfolioDto();
      educationPortfolioDto.courseName = educationItem.courseName;
      educationPortfolioDto.institute = educationItem.institute;
      educationPortfolioDto.startDate = educationItem.startDate;
      educationPortfolioDto.endDate = educationItem.endDate;
      educationPortfolioDto.grade = educationItem.grade;

      educationPortfolioList.push(educationPortfolioDto);
    });

    return educationPortfolioList;
  }

  async getWorkExperience(id: string): Promise<WorkExperiencePortfolioDto[]> {
    this.logger.verbose(`Retrieving the work experience by user ID. ID: ${id}`);
    const workExperience =
      await this.workExperienceRepository.findWorkExperienceByUserId(id);

    if (!workExperience.length)
      throw new NotFoundException(
        `There is no work experience for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating work experience DTO of the user. ID: ${id}`);
    const workExperiencePortfolioList: WorkExperiencePortfolioDto[] = [];
    workExperience.forEach((workExperienceItem) => {
      const bulletPoints = workExperienceItem.bulletPoints.map(
        (bulletPoint) => bulletPoint.bulletPoint,
      );

      const workExperiencePortfolioDto = new WorkExperiencePortfolioDto();
      workExperiencePortfolioDto.role = workExperienceItem.role;
      workExperiencePortfolioDto.company = workExperienceItem.company;
      workExperiencePortfolioDto.startDate = workExperienceItem.startDate;
      workExperiencePortfolioDto.endDate = workExperienceItem.endDate;
      workExperiencePortfolioDto.bulletPoints = bulletPoints;

      workExperiencePortfolioList.push(workExperiencePortfolioDto);
    });

    return workExperiencePortfolioList;
  }

  async getSkills(id: string): Promise<SkillPortfolioDto[]> {
    this.logger.verbose(`Retrieving the skills by user ID. ID: ${id}`);
    const skills = await this.skillRepository.findSkillsByUserId(id);

    if (!skills.length)
      throw new NotFoundException(
        `There is no skills for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating skills DTO of the user. ID: ${id}`);
    const skillsPortfolioList: SkillPortfolioDto[] = [];
    skills.forEach((skillItem) => {
      const skillPortfolioDto = new SkillPortfolioDto();
      skillPortfolioDto.skillName = skillItem.skillName;
      skillPortfolioDto.level = skillItem.level;
      skillPortfolioDto.rating = skillItem.rating;

      skillsPortfolioList.push(skillPortfolioDto);
    });

    return skillsPortfolioList;
  }

  async getProjects(id: string): Promise<ProjectPortfolioDto[]> {
    this.logger.verbose(`Retrieving the projects by user ID. ID: ${id}`);
    const projects = await this.projectRepository.findProjectsByUserId(id);

    if (!projects.length)
      throw new NotFoundException(
        `There is no projects for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating projects DTO of the user. ID: ${id}`);
    const projectsPortfolioList: ProjectPortfolioDto[] = [];
    projects.forEach((projectItem) => {
      const technologies = projectItem.technologies.map(
        (technology) => technology.technologyName,
      );

      const bulletPoints = projectItem.bulletPoints.map(
        (bulletPoint) => bulletPoint.bulletPoint,
      );

      const projectPortfolioDto = new ProjectPortfolioDto();
      projectPortfolioDto.projectName = projectItem.projectName;
      projectPortfolioDto.technologies = technologies;
      projectPortfolioDto.bulletPoints = bulletPoints;

      projectsPortfolioList.push(projectPortfolioDto);
    });

    return projectsPortfolioList;
  }

  async getContacts(id: string): Promise<ContactPortfolioDto> {
    this.logger.verbose(`Retrieving the contacts by user ID. ID: ${id}`);
    const contacts = await this.contactRepository.findContactsByUserId(id);

    if (!contacts)
      throw new NotFoundException(
        `There is no contacts for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating contacts DTO of the user. ID: ${id}`);
    const contactsPortfolioDto = new ContactPortfolioDto();
    contactsPortfolioDto.email = contacts.email;
    contactsPortfolioDto.linkedinUrl = contacts.linkedinUrl;
    contactsPortfolioDto.githubUrl = contacts.githubUrl;

    return contactsPortfolioDto;
  }

  async getBanner(id: string): Promise<BannerDto> {
    this.logger.verbose(`Retrieving the banner by user ID. ID: ${id}`);
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new NotFoundException(
        `There is no user for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating banner DTO of the user. ID: ${id}`);
    const fullName = `${user.firstName} ${user.lastName}`;

    const role = user.workExperiences.slice().sort(function (a, b) {
      return b.startDate.getFullYear() - a.startDate.getFullYear();
    })[0]?.role;

    const bannerDto = new BannerDto();
    bannerDto.fullName = fullName;
    bannerDto.role = role;

    return bannerDto;
  }
}
