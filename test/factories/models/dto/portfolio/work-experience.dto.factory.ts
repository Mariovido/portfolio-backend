import { WorkExperiencePortfolioDto } from '../../../../../src/models/dto/portfolio/work-experience.dto';
import { WorkExperience } from '../../../../../src/repositories/entities/work-experience.entity';

export class WorkExperiencePortfolioDtoFactory {
  static build(mockWorkExperience: WorkExperience): WorkExperiencePortfolioDto {
    const workExperiencePortfolioDto = new WorkExperiencePortfolioDto();
    workExperiencePortfolioDto.role = mockWorkExperience.role;
    workExperiencePortfolioDto.company = mockWorkExperience.company;
    workExperiencePortfolioDto.startDate = mockWorkExperience.startDate;
    workExperiencePortfolioDto.endDate = mockWorkExperience.endDate;

    const bulletPoints = mockWorkExperience.bulletPoints.map(
      (bulletPoint) => bulletPoint.bulletPoint,
    );
    workExperiencePortfolioDto.bulletPoints = bulletPoints;

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
