import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { EducationRepository } from '../../repositories/education.repository';
import { WorkExperienceRepository } from '../../repositories/work-experience.repository';
import { SkillRepository } from '../../repositories/skill.repository';
import { ProjectRepository } from '../../repositories/project.repository';
import { HeaderDto } from '../../models/dto/portfolio/header.dto';
import { EducationPortfolioDto } from '../../models/dto/portfolio/education-portfolio.dto';
import { WorkExperiencePortfolioDto } from '../../models/dto/portfolio/work-experience.dto';
import { SkillPortfolioDto } from '../../models/dto/portfolio/skill-portfolio.dto';
import { ProjectPortfolioDto } from '../../models/dto/portfolio/project-portfolio.dto';
import { FooterPortfolioDto } from '../../models/dto/portfolio/footer-portfolio.dto';
import { getBetweenDates } from '../../utils/portfolio.utils';
import { LinkDto } from '../../models/dto/link.dto';
import { TagDto } from '../../models/dto/tag.dto';
import { BulletPointDto } from '../../models/dto/bullet-point.dto';
import { NavBarDto } from '../../models/dto/portfolio/nav-bar.dto';
import { AboutDto } from '../../models/dto/portfolio/about.dto';
import { ParagraphDto } from '../../models/dto/paragraph.dto';

@Injectable()
export class PortfolioService {
  private logger = new Logger('PortfolioService', { timestamp: true });

  constructor(
    private readonly userRepository: UserRepository,
    private readonly educationRepository: EducationRepository,
    private readonly workExperienceRepository: WorkExperienceRepository,
    private readonly skillRepository: SkillRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  async getHeader(id: string): Promise<HeaderDto> {
    this.logger.verbose(`Retrieving the user by ID. ID: ${id}`);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with ID "${id}" not found`);

    this.logger.verbose(`Creating the header DTO of the user. ID: ${id}`);
    const fullName = `${user.firstName} ${user.lastName}`;

    const lastExperience = user.workExperiences.slice().sort((a, b) => {
      return b.startDate.getFullYear() - a.startDate.getFullYear();
    })[0];
    const role = `${lastExperience.role} at ${lastExperience.company}`;

    const navBarList: NavBarDto[] = [];
    if (user.about.length > 0) {
      const navBarDto = new NavBarDto();
      navBarDto.name = 'About';
      navBarDto.href = '#about';
      navBarList.push(navBarDto);
    }
    if (user.workExperiences.length > 0) {
      const navBarDto = new NavBarDto();
      navBarDto.name = 'Experience';
      navBarDto.href = '#experience';
      navBarList.push(navBarDto);
    }
    if (user.educations.length > 0) {
      const navBarDto = new NavBarDto();
      navBarDto.name = 'Education';
      navBarDto.href = '#education';
      navBarList.push(navBarDto);
    }
    if (user.skills.length > 0) {
      const navBarDto = new NavBarDto();
      navBarDto.name = 'Skill';
      navBarDto.href = '#skill';
      navBarList.push(navBarDto);
    }

    const iconList = user.contact.links.map((link) => {
      const linkDto = new LinkDto();
      linkDto.id = link.id;
      linkDto.name = link.name;
      linkDto.link = link.link;
      linkDto.target = link.target;

      return linkDto;
    });

    const header = new HeaderDto();
    header.name = fullName;
    header.role = role;
    header.description = user.description;
    header.navBar = navBarList;
    header.iconList = iconList;

    return header;
  }

  async getAbout(id: string): Promise<AboutDto> {
    this.logger.verbose(`Retrieving the user by ID. ID: ${id}`);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with ID "${id}" not found`);

    this.logger.verbose(`Creating the about DTO of the user. ID: ${id}`);
    const paragraphs = user.about
      .slice()
      .sort((a, b) => {
        return a.order - b.order;
      })
      .map((paragraph) => {
        const paragraphDto = new ParagraphDto();

        const links = paragraph.links.map((link) => {
          const linkDto = new LinkDto();
          linkDto.tag = link.tag;
          linkDto.name = link.name;
          linkDto.link = link.link;
          linkDto.target = link.target;

          return linkDto;
        });
        paragraphDto.id = paragraph.id;
        paragraphDto.paragraph = paragraph.paragraph;
        paragraphDto.links = links;

        return paragraphDto;
      });

    const about = new AboutDto();
    about.paragraphs = paragraphs;

    return about;
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
      const date = getBetweenDates(
        educationItem.startDate,
        educationItem.endDate,
      );

      const educationPortfolioDto = new EducationPortfolioDto();
      educationPortfolioDto.id = educationItem.id;
      educationPortfolioDto.name = educationItem.courseName;
      educationPortfolioDto.university = educationItem.institute;
      educationPortfolioDto.date = date;
      educationPortfolioDto.universityLink = educationItem.instituteLink;

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
      const date = getBetweenDates(
        workExperienceItem.startDate,
        workExperienceItem.endDate,
      );

      const links = workExperienceItem.links.map((link) => {
        const linkDto = new LinkDto();
        linkDto.id = link.id;
        linkDto.link = link.link;
        linkDto.name = link.name;

        return linkDto;
      });

      const tags = workExperienceItem.tags.map((tag) => {
        const tagDto = new TagDto();
        tagDto.id = tag.id;
        tagDto.tag = tag.tag;

        return tagDto;
      });

      const bulletPoints = workExperienceItem.bulletPoints.map(
        (bulletPoint) => {
          const bulletPointDto = new BulletPointDto();
          bulletPointDto.id = bulletPoint.id;
          bulletPointDto.bulletPoint = bulletPoint.bulletPoint;

          return bulletPointDto;
        },
      );

      const workExperiencePortfolioDto = new WorkExperiencePortfolioDto();
      workExperiencePortfolioDto.id = workExperienceItem.id;
      workExperiencePortfolioDto.role = workExperienceItem.role;
      workExperiencePortfolioDto.company = workExperienceItem.company;
      workExperiencePortfolioDto.companyLink = workExperienceItem.companyLink;
      workExperiencePortfolioDto.date = date;
      workExperiencePortfolioDto.links = links;
      workExperiencePortfolioDto.tags = tags;
      workExperiencePortfolioDto.description = bulletPoints;

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
      skillPortfolioDto.id = skillItem.id;
      skillPortfolioDto.name = skillItem.skillName;
      skillPortfolioDto.progress = skillItem.rating;

      skillsPortfolioList.push(skillPortfolioDto);
    });

    return skillsPortfolioList;
  }

  async getProjects(id: string): Promise<ProjectPortfolioDto[]> {
    this.logger.verbose(`Retrieving the projects by user ID. ID: ${id}`);
    const projects =
      await this.projectRepository.findProjectsByUserIdForPortfolio(id);

    if (!projects.length)
      throw new NotFoundException(
        `There is no projects for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating projects DTO of the user. ID: ${id}`);
    const projectsPortfolioList: ProjectPortfolioDto[] = [];
    projects.forEach((projectItem) => {
      const date = projectItem.date.getFullYear();

      const bulletPoints = projectItem.bulletPoints.map((bulletPoint) => {
        const bulletPointDto = new BulletPointDto();
        bulletPointDto.id = bulletPoint.id;
        bulletPointDto.bulletPoint = bulletPoint.bulletPoint;

        return bulletPointDto;
      });

      const links = projectItem.links.map((link) => {
        const linkDto = new LinkDto();
        linkDto.id = link.id;
        linkDto.link = link.link;
        linkDto.name = link.name;

        return linkDto;
      });

      const tags = projectItem.tags.map((tag) => {
        const tagDto = new TagDto();
        tagDto.id = tag.id;
        tagDto.tag = tag.tag;

        return tagDto;
      });

      const projectPortfolioDto = new ProjectPortfolioDto();
      projectPortfolioDto.id = projectItem.id;
      projectPortfolioDto.title = projectItem.title;
      projectPortfolioDto.subtitle = projectItem.subtitle;
      projectPortfolioDto.projectLink = projectItem.projectLink;
      projectPortfolioDto.imageLink = projectItem.imageLink;
      projectPortfolioDto.date = date;
      projectPortfolioDto.description = bulletPoints;
      projectPortfolioDto.links = links;
      projectPortfolioDto.tags = tags;

      projectsPortfolioList.push(projectPortfolioDto);
    });

    return projectsPortfolioList;
  }

  async getFooter(id: string): Promise<FooterPortfolioDto> {
    this.logger.verbose(`Retrieving the footer by user ID. ID: ${id}`);
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new NotFoundException(
        `There is no user for the user with ID "${id}"`,
      );

    this.logger.verbose(`Creating footer DTO of the user. ID: ${id}`);
    const paragraphs = user.footer.paragraph.map((paragraph) => {
      const paragraphDto = new ParagraphDto();

      const links = paragraph.links.map((link) => {
        const linkDto = new LinkDto();
        linkDto.tag = link.tag;
        linkDto.name = link.name;
        linkDto.link = link.link;
        linkDto.target = link.target;

        return linkDto;
      });
      paragraphDto.id = paragraph.id;
      paragraphDto.paragraph = paragraph.paragraph;
      paragraphDto.links = links;

      return paragraphDto;
    });

    const footerDto = new FooterPortfolioDto();
    footerDto.paragraphs = paragraphs;

    return footerDto;
  }
}
