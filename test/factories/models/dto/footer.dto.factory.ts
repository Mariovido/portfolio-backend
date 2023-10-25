import { CreateFooterDto } from '../../../../src/models/dto/admin/create-footer.dto';
import { FooterDto } from '../../../../src/models/dto/footer.dto';
import { LinkDto } from '../../../../src/models/dto/link.dto';
import { ParagraphDto } from '../../../../src/models/dto/paragraph.dto';
import { Footer } from '../../../../src/repositories/entities/footer.entity';

export class FooterDtoFactory {
  static build(
    mockFooter: Footer,
    mockFooterUpdateDto?: CreateFooterDto,
  ): FooterDto {
    const footerDto = new FooterDto();
    footerDto.id = mockFooter.id;

    const paragraphs = mockFooter.paragraph.map((paragraphItem) => {
      const footerDto = new ParagraphDto();
      footerDto.id = paragraphItem.id;
      footerDto.paragraph = paragraphItem.paragraph;
      footerDto.order = paragraphItem.order;

      const links = paragraphItem.links.map((link) => {
        const linkDto = new LinkDto();
        linkDto.id = link.id;
        linkDto.link = link.link;
        linkDto.name = link.name;
        linkDto.tag = link.tag;
        linkDto.target = link.target;

        return linkDto;
      });
      footerDto.links = links;

      return footerDto;
    });
    footerDto.paragraph = paragraphs;
    footerDto.user = mockFooterUpdateDto
      ? mockFooterUpdateDto.user
      : mockFooter.user.id;

    return footerDto;
  }

  static buildList(size: number, mockFooter: Footer): FooterDto[] {
    const footerDtoList: FooterDto[] = [];

    for (let i = 0; i < size; i++) {
      footerDtoList.push(this.build(mockFooter));
    }

    return footerDtoList;
  }

  static buildListByFooterList(mockFooterList: Footer[]): FooterDto[] {
    const footerDtoList: FooterDto[] = [];

    for (const footer of mockFooterList) {
      footerDtoList.push(this.build(footer));
    }

    return footerDtoList;
  }
}
