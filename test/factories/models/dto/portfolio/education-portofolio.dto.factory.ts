import { EducationPortfolioDto } from '../../../../../src/models/dto/portfolio/education-portfolio.dto';
import { Education } from '../../../../../src/repositories/entities/education.entity';
import { getBetweenDates } from '../../../../../src/utils/portfolio.utils';

export class EducationPortfolioDtoFactory {
  static build(mockEducation: Education): EducationPortfolioDto {
    const educationPortfolioDto = new EducationPortfolioDto();
    educationPortfolioDto.id = mockEducation.id;
    educationPortfolioDto.name = mockEducation.courseName;
    educationPortfolioDto.university = mockEducation.institute;

    const date = getBetweenDates(
      mockEducation.startDate,
      mockEducation.endDate,
    );
    educationPortfolioDto.date = date;

    educationPortfolioDto.universityLink = mockEducation.instituteLink;

    return educationPortfolioDto;
  }

  static buildList(
    size: number,
    mockEducation: Education,
  ): EducationPortfolioDto[] {
    const educationPortfolioDtoList: EducationPortfolioDto[] = [];

    for (let i = 0; i < size; i++) {
      educationPortfolioDtoList.push(this.build(mockEducation));
    }

    return educationPortfolioDtoList;
  }

  static buildListByEducationList(
    mockEducationList: Education[],
  ): EducationPortfolioDto[] {
    const educationPortfolioDtoList: EducationPortfolioDto[] = [];

    for (const education of mockEducationList) {
      educationPortfolioDtoList.push(this.build(education));
    }

    return educationPortfolioDtoList;
  }
}
