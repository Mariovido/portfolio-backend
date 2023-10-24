import { CreateEducationDto } from '../../../../../src/models/dto/admin/create-education.dto';

export class CreateEducationDtoFactory {
  static build(): CreateEducationDto {
    const createEducationDto = new CreateEducationDto();
    createEducationDto.courseName = 'engeneering';
    createEducationDto.institute = 'university';
    createEducationDto.instituteLink = 'http://ejvovjev.sz/ajuzi';
    createEducationDto.startDate = new Date();
    createEducationDto.endDate = new Date();
    createEducationDto.grade = 7;

    return createEducationDto;
  }
}
