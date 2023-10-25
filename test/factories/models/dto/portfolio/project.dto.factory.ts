import { ProjectPortfolioDto } from '../../../../../src/models/dto/portfolio/project-portfolio.dto';
import { Project } from '../../../../../src/repositories/entities/project.entity';

// TODO - RETOCAR
export class ProjectPortfolioDtoFactory {
  static build(mockProject: Project): ProjectPortfolioDto {
    const projectPortfolioDto = new ProjectPortfolioDto();
    projectPortfolioDto.projectName = mockProject.projectName;

    // const technologies = mockProject.technologies.map(
    //   (technology) => technology.technologyName,
    // );
    // projectPortfolioDto.technologies = technologies;

    const bulletPoints = mockProject.bulletPoints.map(
      (bulletPoint) => bulletPoint.bulletPoint,
    );
    projectPortfolioDto.bulletPoints = bulletPoints;

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
