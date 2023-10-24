import { Footer } from '../../../../src/repositories/entities/footer.entity';
import { Paragraph } from '../../../../src/repositories/entities/paragraph.entity';
import { User } from '../../../../src/repositories/entities/user.entity';
import { LinkFactory } from './link.entity.factory';

export class ParagraphFactory {
  static build(isFooter: boolean): Paragraph {
    const paragraph = new Paragraph();
    paragraph.id = '38dca8f1-85a1-4b30-a0ed-36ded591c310';
    paragraph.paragraph =
      'making picture fresh hello result tower pitch negative iron manufacturing ability leader am film organization nervous edge tongue newspaper again education wet even chemical';
    paragraph.order = 1;
    paragraph.links = LinkFactory.buildList(2, { isParagraph: true });
    if (isFooter) paragraph.footer = new Footer();
    else paragraph.user = new User();

    return paragraph;
  }

  static buildList(size: number, isFooter: boolean): Paragraph[] {
    const paragraphList: Paragraph[] = [];

    for (let i = 0; i < size; i++) {
      paragraphList.push(this.build(isFooter));
    }

    return paragraphList;
  }
}
