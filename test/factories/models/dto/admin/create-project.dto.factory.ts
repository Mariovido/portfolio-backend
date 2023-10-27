import { CreateProjectDto } from '../../../../../src/models/dto/admin/create-project.dto';

export class CreateProjectDtoFactory {
  static build(): CreateProjectDto {
    const createContactDto = new CreateProjectDto();
    createContactDto.title = 'three';
    createContactDto.subtitle = 'pitch';
    createContactDto.projectLink = 'http://kopfim.sa/dic';
    createContactDto.imageLink = 'http://cusodoso.cy/capnivvu';
    createContactDto.date = new Date();
    createContactDto.isDisplayed = true;

    return createContactDto;
  }
}
