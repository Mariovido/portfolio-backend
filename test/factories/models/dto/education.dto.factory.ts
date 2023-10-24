import { CreateEducationDto } from '../../../../src/models/dto/admin/create-education.dto';
import { UpdateEducationDto } from '../../../../src/models/dto/admin/update-education.dto';
import { EducationDto } from '../../../../src/models/dto/education.dto';
import { Education } from '../../../../src/repositories/entities/education.entity';

export class EducationDtoFactory {
  static build(
    mockEducation: Education,
    mockUpdateEducation?: CreateEducationDto | UpdateEducationDto,
  ): EducationDto {
    const educationDto = new EducationDto();
    educationDto.id = mockEducation.id;
    educationDto.courseName = mockUpdateEducation
      ? mockUpdateEducation.courseName
      : mockEducation.courseName;
    educationDto.institute = mockUpdateEducation
      ? mockUpdateEducation.institute
      : mockEducation.institute;
    educationDto.instituteLink = mockUpdateEducation
      ? mockUpdateEducation.instituteLink
      : mockEducation.instituteLink;
    educationDto.startDate = mockUpdateEducation
      ? mockUpdateEducation.startDate
      : mockEducation.startDate;
    educationDto.endDate = mockUpdateEducation
      ? mockUpdateEducation.endDate
      : mockEducation.endDate;
    educationDto.grade = mockUpdateEducation
      ? mockUpdateEducation.grade
      : mockEducation.grade;
    educationDto.user = mockEducation.user.id;

    return educationDto;
  }

  static buildList(size: number, mockEducation: Education): EducationDto[] {
    const educationDtoList: EducationDto[] = [];

    for (let i = 0; i < size; i++) {
      educationDtoList.push(this.build(mockEducation));
    }

    return educationDtoList;
  }

  static buildListByEducationList(
    mockEducationList: Education[],
  ): EducationDto[] {
    const educationDtoList: EducationDto[] = [];

    for (const education of mockEducationList) {
      educationDtoList.push(this.build(education));
    }

    return educationDtoList;
  }
}
