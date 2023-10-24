import { LinkDto } from '../../../../../src/models/dto/link.dto';
import { ParagraphDto } from '../../../../../src/models/dto/paragraph.dto';
import { FooterPortfolioDto } from '../../../../../src/models/dto/portfolio/footer-portfolio.dto';
import { User } from '../../../../../src/repositories/entities/user.entity';

export class FooterPortfolioDtoFactory {
  static build(mockUser: User): FooterPortfolioDto {
    const footerPortfolioDto = new FooterPortfolioDto();
    const paragraphs = mockUser.footer.paragraph.map((paragraph) => {
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
    footerPortfolioDto.paragraphs = paragraphs;

    return footerPortfolioDto;
  }

  static buildList(size: number, mockUser: User): FooterPortfolioDto[] {
    const footerPortfolioDtoList: FooterPortfolioDto[] = [];

    for (let i = 0; i < size; i++) {
      footerPortfolioDtoList.push(this.build(mockUser));
    }

    return footerPortfolioDtoList;
  }
}
