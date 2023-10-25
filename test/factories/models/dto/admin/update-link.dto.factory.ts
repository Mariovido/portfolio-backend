import { UpdateLinkDto } from '../../../../../src/models/dto/admin/update-link.dto';

export class UpdateLinkDtoFactory {
  static build(): UpdateLinkDto {
    const updateLinkDto = new UpdateLinkDto();
    updateLinkDto.tag = 'thetag2';
    updateLinkDto.name = 'linkedin';
    updateLinkDto.target = '_blank';

    return updateLinkDto;
  }
}
