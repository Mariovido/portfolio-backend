import { UpdateContactDto } from '../../../../../src/models/dto/admin/update-contact.dto';

export class UpdateContactDtoFactory {
  static build(): UpdateContactDto {
    const updateContactDto = new UpdateContactDto();
    updateContactDto.email = 'test3@test.com';

    return updateContactDto;
  }
}
