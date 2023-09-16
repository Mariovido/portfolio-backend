import { CreateInterestDto } from '../../../../../src/models/dto/admin/create-interest.dto';

export class CreateInterestDtoFactory {
  static build(): CreateInterestDto {
    const createContactDto = new CreateInterestDto();
    createContactDto.interestName = 'Interesting';

    return createContactDto;
  }
}
