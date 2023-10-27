import { UpdateProjectDto } from '../../../../../src/models/dto/admin/update-project.dto';

export class UpdateProjectDtoFactory {
  static build(): UpdateProjectDto {
    const updateProjectDto = new UpdateProjectDto();
    updateProjectDto.title = 'three';
    updateProjectDto.subtitle = 'pitch';
    updateProjectDto.projectLink = 'http://kopfim.sa/dic';
    updateProjectDto.imageLink = 'http://cusodoso.cy/capnivvu';
    updateProjectDto.date = new Date();
    updateProjectDto.isDisplayed = true;

    return updateProjectDto;
  }
}
