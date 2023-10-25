import { CreateContactDto } from '../../../../src/models/dto/admin/create-contact.dto';
import { UpdateContactDto } from '../../../../src/models/dto/admin/update-contact.dto';
import { ContactDto } from '../../../../src/models/dto/contact.dto';
import { LinkDto } from '../../../../src/models/dto/link.dto';
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
    const links = mockContact.links.map((link) => {
      const linkDto = new LinkDto();
      linkDto.id = link.id;
      linkDto.link = link.link;
      linkDto.name = link.name;
      linkDto.tag = link.tag;
      linkDto.target = link.target;

      return linkDto;
    });
    contactDto.links = links;
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
