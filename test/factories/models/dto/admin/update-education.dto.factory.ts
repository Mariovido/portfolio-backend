import { UpdateEducationDto } from '../../../../../src/models/dto/admin/update-education.dto';

export class UpdateEducationDtoFactory {
  static build(): UpdateEducationDto {
    const updateEducationDto = new UpdateEducationDto();
    updateEducationDto.courseName = 'engeneering';
    updateEducationDto.typeOfDegree = 'MS';
    updateEducationDto.institute = 'university';
    updateEducationDto.startDate = new Date();
    updateEducationDto.endDate = new Date();
    updateEducationDto.grade = 7;

    return updateEducationDto;
  }
}
