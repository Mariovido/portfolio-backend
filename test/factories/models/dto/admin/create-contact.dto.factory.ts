import { CreateContactDto } from '../../../../../src/models/dto/admin/create-contact.dto';

export class CreateContactDtoFactory {
  static build(): CreateContactDto {
    const createContactDto = new CreateContactDto();
    createContactDto.email = 'test1@test.com';
    createContactDto.linkedinUrl = 'http://test.com';
    createContactDto.githubUrl = 'http://test.com';

    return createContactDto;
  }
}
