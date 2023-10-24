import { Contact } from '../../../../src/repositories/entities/contact.entity';
import { Link } from '../../../../src/repositories/entities/link.entity';
import { Paragraph } from '../../../../src/repositories/entities/paragraph.entity';
import { WorkExperience } from '../../../../src/repositories/entities/work-experience.entity';

export class LinkFactory {
  static build({
    isWorkExperience,
    isParagraph,
    isContact,
  }: {
    isWorkExperience?: boolean;
    isParagraph?: boolean;
    isContact?: boolean;
  }): Link {
    const link = new Link();
    link.id = '38dca8f1-85a1-4b30-a0ed-36ded591c310';
    link.tag = 'morning';
    link.name = 'strike';
    link.link = 'http://vihu.cd/zorit';
    link.target = 'boat';
    if (isWorkExperience) link.workExperience = new WorkExperience();
    if (isParagraph) link.paragraph = new Paragraph();
    if (isContact) link.contact = new Contact();

    return link;
  }

  static buildList(
    size: number,
    {
      isWorkExperience,
      isParagraph,
      isContact,
    }: {
      isWorkExperience?: boolean;
      isParagraph?: boolean;
      isContact?: boolean;
    },
  ): Link[] {
    const linkList: Link[] = [];

    for (let i = 0; i < size; i++) {
      linkList.push(this.build({ isWorkExperience, isParagraph, isContact }));
    }

    return linkList;
  }
}
