import { Footer } from '../../../../src/repositories/entities/footer.entity';
import { User } from '../../../../src/repositories/entities/user.entity';
import { ParagraphFactory } from './paragraph.entity.factory';

export class FooterFactory {
  static build(): Footer {
    const footer = new Footer();
    footer.id = '38dca8f1-85a1-4b30-a0ed-36ded591c310';
    footer.paragraph = ParagraphFactory.buildList(2, true);
    footer.user = new User();

    return footer;
  }

  static buildList(size: number): Footer[] {
    const footerlist: Footer[] = [];

    for (let i = 0; i < size; i++) {
      footerlist.push(this.build());
    }

    return footerlist;
  }
}
