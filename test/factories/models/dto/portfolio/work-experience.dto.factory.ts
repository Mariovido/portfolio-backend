import { BulletPointDto } from '../../../../../src/models/dto/bullet-point.dto';
import { LinkDto } from '../../../../../src/models/dto/link.dto';
import { WorkExperiencePortfolioDto } from '../../../../../src/models/dto/portfolio/work-experience.dto';
import { TagDto } from '../../../../../src/models/dto/tag.dto';
import { WorkExperience } from '../../../../../src/repositories/entities/work-experience.entity';
import { getBetweenDates } from '../../../../../src/utils/portfolio.utils';

export class WorkExperiencePortfolioDtoFactory {
  static build(mockWorkExperience: WorkExperience): WorkExperiencePortfolioDto {
    const workExperiencePortfolioDto = new WorkExperiencePortfolioDto();
    workExperiencePortfolioDto.id = mockWorkExperience.id;
    workExperiencePortfolioDto.role = mockWorkExperience.role;
    workExperiencePortfolioDto.company = mockWorkExperience.company;
    workExperiencePortfolioDto.companyLink = mockWorkExperience.companyLink;

    const date = getBetweenDates(
      mockWorkExperience.startDate,
      mockWorkExperience.endDate,
    );
    workExperiencePortfolioDto.date = date;

    const bulletPoints = mockWorkExperience.bulletPoints.map((bulletPoint) => {
      const bulletPointDto = new BulletPointDto();
      bulletPointDto.id = bulletPoint.id;
      bulletPointDto.bulletPoint = bulletPoint.bulletPoint;

      return bulletPointDto;
    });
    workExperiencePortfolioDto.description = bulletPoints;

    const links = mockWorkExperience.links.map((link) => {
      const linkDto = new LinkDto();
      linkDto.id = link.id;
      linkDto.link = link.link;
      linkDto.name = link.name;

      return linkDto;
    });
    workExperiencePortfolioDto.links = links;

    const tags = mockWorkExperience.tags.map((tag) => {
      const tagDto = new TagDto();
      tagDto.id = tag.id;
      tagDto.tag = tag.tag;

      return tagDto;
    });
    workExperiencePortfolioDto.tags = tags;

    return workExperiencePortfolioDto;
  }

  static buildList(
    size: number,
    mockWorkExperience: WorkExperience,
  ): WorkExperiencePortfolioDto[] {
    const workExperiencePortfolioDtoList: WorkExperiencePortfolioDto[] = [];

    for (let i = 0; i < size; i++) {
      workExperiencePortfolioDtoList.push(this.build(mockWorkExperience));
    }

    return workExperiencePortfolioDtoList;
  }

  static buildListByWorkExperienceList(
    mockWorkExperienceList: WorkExperience[],
  ): WorkExperiencePortfolioDto[] {
    const workExperiencePortfolioDtoList: WorkExperiencePortfolioDto[] = [];

    for (const workExperience of mockWorkExperienceList) {
      workExperiencePortfolioDtoList.push(this.build(workExperience));
    }

    return workExperiencePortfolioDtoList;
  }
}
