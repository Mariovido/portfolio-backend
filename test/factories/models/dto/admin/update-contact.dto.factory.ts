import { UpdateContactDto } from '../../../../../src/models/dto/admin/update-contact.dto';

export class UpdateContactDtoFactory {
  static build(): UpdateContactDto {
    const updateContactDto = new UpdateContactDto();
    updateContactDto.email = 'test3@test.com';
    updateContactDto.linkedinUrl = 'http://test2.com';
    updateContactDto.githubUrl = 'http://test3.com';

    return updateContactDto;
  }
}
