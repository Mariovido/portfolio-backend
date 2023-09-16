import { CreateProjectDto } from '../../../../../src/models/dto/admin/create-project.dto';

export class CreateProjectDtoFactory {
  static build(): CreateProjectDto {
    const createContactDto = new CreateProjectDto();
    createContactDto.projectName = 'Fantastic Project';

    return createContactDto;
  }
}
