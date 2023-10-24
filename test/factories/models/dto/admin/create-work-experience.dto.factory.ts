import { CreateWorkExperienceDto } from '../../../../../src/models/dto/admin/create-work-experience.dto';

export class CreateWorkExperienceDtoFactory {
  static build(): CreateWorkExperienceDto {
    const createWorkExperienceDto = new CreateWorkExperienceDto();
    createWorkExperienceDto.role = 'developer';
    createWorkExperienceDto.company = 'The company';
    createWorkExperienceDto.companyLink = 'http://wan.pr/jol';
    createWorkExperienceDto.startDate = new Date();
    createWorkExperienceDto.endDate = new Date();

    return createWorkExperienceDto;
  }
}
