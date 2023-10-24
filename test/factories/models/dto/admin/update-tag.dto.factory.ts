import { UpdateTagDto } from '../../../../../src/models/dto/admin/update-tag.dto';

export class UpdateTagDtoFactory {
  static build(): UpdateTagDto {
    const updateTagDto = new UpdateTagDto();
    updateTagDto.tag = 'TagDifferent';

    return updateTagDto;
  }
}
