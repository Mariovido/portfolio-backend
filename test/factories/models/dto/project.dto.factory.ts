import { CreateProjectDto } from '../../../../src/models/dto/admin/create-project.dto';
import { UpdateProjectDto } from '../../../../src/models/dto/admin/update-project.dto';
import { ProjectDto } from '../../../../src/models/dto/project.dto';
import { Project } from '../../../../src/repositories/entities/project.entity';

// TODO - RETOCAR
export class ProjectDtoFactory {
  static build(
    mockProject: Project,
    mockProjectUpdateDto?: CreateProjectDto | UpdateProjectDto,
  ): ProjectDto {
    const projectDto = new ProjectDto();
    projectDto.id = mockProject.id;
    projectDto.projectName = mockProjectUpdateDto
      ? mockProjectUpdateDto.projectName
      : mockProject.projectName;

    const technologies = mockProject.technologies.map(
      (technology) => technology.technologyName,
    );
    projectDto.technologies = technologies;

    const bulletPoints = mockProject.bulletPoints.map(
      (bulletPoint) => bulletPoint.bulletPoint,
    );
    projectDto.bulletPoints = bulletPoints;
    projectDto.user = mockProject.user.id;

    return projectDto;
  }

  static buildList(size: number, mockProject: Project): ProjectDto[] {
    const projectDtoList: ProjectDto[] = [];

    for (let i = 0; i < size; i++) {
      projectDtoList.push(this.build(mockProject));
    }

    return projectDtoList;
  }

  static buildListByProjectList(mockProjectList: Project[]): ProjectDto[] {
    const projectDtoList: ProjectDto[] = [];

    for (const project of mockProjectList) {
      projectDtoList.push(this.build(project));
    }

    return projectDtoList;
  }
}
