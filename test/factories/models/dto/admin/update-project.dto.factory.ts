import { UpdateProjectDto } from '../../../../../src/models/dto/admin/update-project.dto';

// TODO - RETOCAR
export class UpdateProjectDtoFactory {
  static build(): UpdateProjectDto {
    const updateProjectDto = new UpdateProjectDto();
    updateProjectDto.projectName = 'Project Awesome';

    return updateProjectDto;
  }
}
