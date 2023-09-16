import { UpdateInterestDto } from '../../../../../src/models/dto/admin/update-interest.dto';

export class UpdateInterestDtoFactory {
  static build(): UpdateInterestDto {
    const updateInterestDto = new UpdateInterestDto();
    updateInterestDto.interestName = 'Basketball';

    return updateInterestDto;
  }
}
