import { BulletPointDto } from '../../../../../src/models/dto/bullet-point.dto';
import { LinkDto } from '../../../../../src/models/dto/link.dto';
import { ProjectPortfolioDto } from '../../../../../src/models/dto/portfolio/project-portfolio.dto';
import { TagDto } from '../../../../../src/models/dto/tag.dto';
import { Project } from '../../../../../src/repositories/entities/project.entity';

export class ProjectPortfolioDtoFactory {
  static build(mockProject: Project): ProjectPortfolioDto {
    const projectPortfolioDto = new ProjectPortfolioDto();
    projectPortfolioDto.id = mockProject.id;
    projectPortfolioDto.title = mockProject.title;
    projectPortfolioDto.subtitle = mockProject.subtitle;
    projectPortfolioDto.projectLink = mockProject.projectLink;
    projectPortfolioDto.imageLink = mockProject.imageLink;
    projectPortfolioDto.date = mockProject.date.getFullYear();

    const bulletPoints = mockProject.bulletPoints.map((bulletPoint) => {
      const bulletPointDto = new BulletPointDto();
      bulletPointDto.id = bulletPoint.id;
      bulletPointDto.bulletPoint = bulletPoint.bulletPoint;

      return bulletPointDto;
    });
    projectPortfolioDto.description = bulletPoints;

    const links = mockProject.links.map((link) => {
      const linkDto = new LinkDto();
      linkDto.id = link.id;
      linkDto.link = link.link;
      linkDto.name = link.name;

      return linkDto;
    });
    projectPortfolioDto.links = links;
    const tags = mockProject.tags.map((tag) => {
      const tagDto = new TagDto();
      tagDto.id = tag.id;
      tagDto.tag = tag.tag;

      return tagDto;
    });
    projectPortfolioDto.tags = tags;

    return projectPortfolioDto;
  }

  static buildList(size: number, mockProject: Project): ProjectPortfolioDto[] {
    const projectPortfolioDtoList: ProjectPortfolioDto[] = [];

    for (let i = 0; i < size; i++) {
      projectPortfolioDtoList.push(this.build(mockProject));
    }

    return projectPortfolioDtoList;
  }

  static buildListByProjectList(
    mockProjectList: Project[],
  ): ProjectPortfolioDto[] {
    const projectPortfolioDtoList: ProjectPortfolioDto[] = [];

    for (const project of mockProjectList) {
      projectPortfolioDtoList.push(this.build(project));
    }

    return projectPortfolioDtoList;
  }
}
