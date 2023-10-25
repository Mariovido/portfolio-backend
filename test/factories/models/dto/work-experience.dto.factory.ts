import { CreateWorkExperienceDto } from '../../../../src/models/dto/admin/create-work-experience.dto';
import { UpdateWorkExperienceDto } from '../../../../src/models/dto/admin/update-work-experience.dto';
import { BulletPointDto } from '../../../../src/models/dto/bullet-point.dto';
import { LinkDto } from '../../../../src/models/dto/link.dto';
import { TagDto } from '../../../../src/models/dto/tag.dto';
import { WorkExperienceDto } from '../../../../src/models/dto/work-experience.dto';
import { WorkExperience } from '../../../../src/repositories/entities/work-experience.entity';

export class WorkExperienceDtoFactory {
  static build(
    mockWorkExperience: WorkExperience,
    mockWorkExperienceUpdate?:
      | CreateWorkExperienceDto
      | UpdateWorkExperienceDto,
  ): WorkExperienceDto {
    const workExperienceDto = new WorkExperienceDto();
    workExperienceDto.id = mockWorkExperience.id;
    workExperienceDto.role = mockWorkExperienceUpdate
      ? mockWorkExperienceUpdate.role
      : mockWorkExperience.role;
    workExperienceDto.company = mockWorkExperienceUpdate
      ? mockWorkExperienceUpdate.company
      : mockWorkExperience.company;
    workExperienceDto.companyLink = mockWorkExperienceUpdate
      ? mockWorkExperienceUpdate.companyLink
      : mockWorkExperience.companyLink;
    workExperienceDto.companyLink = mockWorkExperienceUpdate
      ? mockWorkExperienceUpdate.companyLink
      : mockWorkExperience.companyLink;
    workExperienceDto.startDate = mockWorkExperienceUpdate
      ? mockWorkExperienceUpdate.startDate
      : mockWorkExperience.startDate;
    workExperienceDto.endDate = mockWorkExperienceUpdate
      ? mockWorkExperienceUpdate.endDate
      : mockWorkExperience.endDate;

    const bulletPoints = mockWorkExperience.bulletPoints.map((bulletPoint) => {
      const bulletPointDto = new BulletPointDto();
      bulletPointDto.id = bulletPoint.id;
      bulletPointDto.bulletPoint = bulletPoint.bulletPoint;

      return bulletPointDto;
    });
    workExperienceDto.bulletPoints = bulletPoints;

    const links = mockWorkExperience.links.map((link) => {
      const linkDto = new LinkDto();
      linkDto.id = link.id;
      linkDto.link = link.link;
      linkDto.name = link.name;
      linkDto.tag = link.tag;
      linkDto.target = link.target;

      return linkDto;
    });
    workExperienceDto.links = links;

    const tags = mockWorkExperience.tags.map((tag) => {
      const tagDto = new TagDto();
      tagDto.id = tag.id;
      tagDto.tag = tag.tag;

      return tagDto;
    });
    workExperienceDto.tags = tags;
    workExperienceDto.user = mockWorkExperience.user.id;

    return workExperienceDto;
  }

  static buildList(
    size: number,
    mockWorkExperience: WorkExperience,
  ): WorkExperienceDto[] {
    const workExperienceDtoList: WorkExperienceDto[] = [];

    for (let i = 0; i < size; i++) {
      workExperienceDtoList.push(this.build(mockWorkExperience));
    }

    return workExperienceDtoList;
  }

  static buildListWorkExperienceList(
    mockWorkExperienceList: WorkExperience[],
  ): WorkExperienceDto[] {
    const workExperienceDtoList: WorkExperienceDto[] = [];

    for (const workExperience of mockWorkExperienceList) {
      workExperienceDtoList.push(this.build(workExperience));
    }

    return workExperienceDtoList;
  }
}
