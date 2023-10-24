import { LinkDto } from '../../../../../src/models/dto/link.dto';
import { ParagraphDto } from '../../../../../src/models/dto/paragraph.dto';
import { AboutDto } from '../../../../../src/models/dto/portfolio/about.dto';
import { User } from '../../../../../src/repositories/entities/user.entity';

export class AboutDtoFactory {
  static build(mockUser: User): AboutDto {
    const about = new AboutDto();
    const paragraphs = mockUser.about
      .slice()
      .sort((a, b) => {
        return a.order - b.order;
      })
      .map((paragraph) => {
        const paragraphDto = new ParagraphDto();

        const links = paragraph.links.map((link) => {
          const linkDto = new LinkDto();
          linkDto.tag = link.tag;
          linkDto.name = link.name;
          linkDto.link = link.link;
          linkDto.target = link.target;

          return linkDto;
        });
        paragraphDto.id = paragraph.id;
        paragraphDto.paragraph = paragraph.paragraph;
        paragraphDto.links = links;

        return paragraphDto;
      });
    about.paragraphs = paragraphs;

    return about;
  }

  static buildList(size: number, mockUser: User): AboutDto[] {
    const aboutList: AboutDto[] = [];

    for (let i = 0; i < size; i++) {
      aboutList.push(this.build(mockUser));
    }

    return aboutList;
  }
}
