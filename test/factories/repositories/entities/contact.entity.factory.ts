import { Contact } from '../../../../src/repositories/entities/contact.entity';
import { User } from '../../../../src/repositories/entities/user.entity';

export class ContactFactory {
  static build(): Contact {
    const contact = new Contact();
    contact.id = '0d40816f-bf7b-443e-bc05-17bc699005e1';
    contact.email = 'uzo@lowpeso.im';
    contact.linkedinUrl = 'http://panmal.as/ve';
    contact.githubUrl = 'http://nocuriv.pa/cu';
    contact.user = new User();

    return contact;
  }

  static buildList(size: number): Contact[] {
    const contactList: Contact[] = [];

    for (let i = 0; i < size; i++) {
      contactList.push(this.build());
    }

    return contactList;
  }
}
