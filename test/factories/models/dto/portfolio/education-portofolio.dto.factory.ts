import { EducationPortfolioDto } from '../../../../../src/models/dto/portfolio/education-portfolio.dto';
import { Education } from '../../../../../src/repositories/entities/education.entity';

export class EducationPortfolioDtoFactory {
  static build(mockEducation: Education): EducationPortfolioDto {
    const educationPortfolioDto = new EducationPortfolioDto();
    educationPortfolioDto.courseName = mockEducation.courseName;
    educationPortfolioDto.institute = mockEducation.institute;
    educationPortfolioDto.startDate = mockEducation.startDate;
    educationPortfolioDto.endDate = mockEducation.endDate;
    educationPortfolioDto.grade = mockEducation.grade;

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
