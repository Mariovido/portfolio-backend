import { CreateContactDto } from '../../../../src/models/dto/admin/create-contact.dto';
import { UpdateContactDto } from '../../../../src/models/dto/admin/update-contact.dto';
import { ContactDto } from '../../../../src/models/dto/contact.dto';
import { Contact } from '../../../../src/repositories/entities/contact.entity';

export class ContactDtoFactory {
  static build(
    mockContact: Contact,
    mockContactUpdateDto?: CreateContactDto | UpdateContactDto,
  ): ContactDto {
    const contactDto = new ContactDto();
    contactDto.id = mockContact.id;
    contactDto.email = mockContactUpdateDto
      ? mockContactUpdateDto.email
      : mockContact.email;
    contactDto.linkedinUrl = mockContactUpdateDto
      ? mockContactUpdateDto.linkedinUrl
      : mockContact.linkedinUrl;
    contactDto.githubUrl = mockContactUpdateDto
      ? mockContactUpdateDto.githubUrl
      : mockContact.githubUrl;
    contactDto.user = mockContact.user.id;

    return contactDto;
  }

  static buildList(size: number, mockContact: Contact): ContactDto[] {
    const contactDtoList: ContactDto[] = [];

    for (let i = 0; i < size; i++) {
      contactDtoList.push(this.build(mockContact));
    }

    return contactDtoList;
  }

  static buildListByContactList(mockContactList: Contact[]): ContactDto[] {
    const contactDtoList: ContactDto[] = [];

    for (const contact of mockContactList) {
      contactDtoList.push(this.build(contact));
    }

    return contactDtoList;
  }
}
