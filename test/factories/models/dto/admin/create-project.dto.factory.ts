import { CreateProjectDto } from '../../../../../src/models/dto/admin/create-project.dto';

// TODO - RETOCAR
export class CreateProjectDtoFactory {
  static build(): CreateProjectDto {
    const createContactDto = new CreateProjectDto();
    createContactDto.projectName = 'Fantastic Project';

    return createContactDto;
  }
}
