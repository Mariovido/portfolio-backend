import { CreateProjectDto } from '../../../../src/models/dto/admin/create-project.dto';
import { UpdateProjectDto } from '../../../../src/models/dto/admin/update-project.dto';
import { BulletPointDto } from '../../../../src/models/dto/bullet-point.dto';
import { LinkDto } from '../../../../src/models/dto/link.dto';
import { ProjectDto } from '../../../../src/models/dto/project.dto';
import { TagDto } from '../../../../src/models/dto/tag.dto';
import { Project } from '../../../../src/repositories/entities/project.entity';

export class ProjectDtoFactory {
  static build(
    mockProject: Project,
    mockProjectUpdateDto?: CreateProjectDto | UpdateProjectDto,
  ): ProjectDto {
    const projectDto = new ProjectDto();
    projectDto.id = mockProject.id;
    projectDto.title = mockProjectUpdateDto
      ? mockProjectUpdateDto.title
      : mockProject.title;
    projectDto.subtitle = mockProjectUpdateDto
      ? mockProjectUpdateDto.subtitle
      : mockProject.subtitle;
    projectDto.projectLink = mockProjectUpdateDto
      ? mockProjectUpdateDto.projectLink
      : mockProject.projectLink;
    projectDto.imageLink = mockProjectUpdateDto
      ? mockProjectUpdateDto.imageLink
      : mockProject.imageLink;
    projectDto.date = mockProjectUpdateDto
      ? mockProjectUpdateDto.date
      : mockProject.date;
    projectDto.isDisplayed = mockProjectUpdateDto
      ? mockProjectUpdateDto.isDisplayed
      : mockProject.isDisplayed;

    const bulletPoints = mockProject.bulletPoints.map((bulletPoint) => {
      const bulletPointDto = new BulletPointDto();
      bulletPointDto.id = bulletPoint.id;
      bulletPointDto.bulletPoint = bulletPoint.bulletPoint;

      return bulletPointDto;
    });
    projectDto.bulletPoints = bulletPoints;

    const links = mockProject.links.map((link) => {
      const linkDto = new LinkDto();
      linkDto.id = link.id;
      linkDto.link = link.link;
      linkDto.name = link.name;
      linkDto.tag = link.tag;
      linkDto.target = link.target;

      return linkDto;
    });
    projectDto.links = links;
    const tags = mockProject.tags.map((tag) => {
      const tagDto = new TagDto();
      tagDto.id = tag.id;
      tagDto.tag = tag.tag;

      return tagDto;
    });
    projectDto.tags = tags;
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
