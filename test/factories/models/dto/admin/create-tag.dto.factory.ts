import { CreateTagDto } from '../../../../../src/models/dto/admin/create-tag.dto';

export class CreateTagDtoFactory {
  static build(): CreateTagDto {
    const createTagDto = new CreateTagDto();
    createTagDto.tag = 'Tag';
    createTagDto.workExperience = '4f8d94aa-a7c8-485d-9c7f-e71cc5423ab3';

    return createTagDto;
  }
}
