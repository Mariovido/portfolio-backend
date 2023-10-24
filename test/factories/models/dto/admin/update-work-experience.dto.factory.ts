import { UpdateWorkExperienceDto } from '../../../../../src/models/dto/admin/update-work-experience.dto';

export class UpdateWorkExperienceDtoFactory {
  static build(): UpdateWorkExperienceDto {
    const updateWorkExperienceDto = new UpdateWorkExperienceDto();
    updateWorkExperienceDto.role = 'developer III';
    updateWorkExperienceDto.company = 'The company 3';
    updateWorkExperienceDto.companyLink = 'http://wan.pr/jol';
    updateWorkExperienceDto.startDate = new Date();
    updateWorkExperienceDto.endDate = new Date();

    return updateWorkExperienceDto;
  }
}
