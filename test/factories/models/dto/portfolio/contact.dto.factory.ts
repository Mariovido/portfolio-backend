import { ContactPortfolioDto } from '../../../../../src/models/dto/portfolio/contact-portfolio.dto';
import { Contact } from '../../../../../src/repositories/entities/contact.entity';

export class ContactPortfolioDtoFactory {
  static build(mockContact: Contact): ContactPortfolioDto {
    const contactPortfolioDto = new ContactPortfolioDto();
    contactPortfolioDto.email = mockContact.email;
    contactPortfolioDto.linkedinUrl = mockContact.linkedinUrl;
    contactPortfolioDto.githubUrl = mockContact.githubUrl;

    return contactPortfolioDto;
  }

  static buildList(size: number, mockContact: Contact): ContactPortfolioDto[] {
    const contactPortfolioDtoList: ContactPortfolioDto[] = [];

    for (let i = 0; i < size; i++) {
      contactPortfolioDtoList.push(this.build(mockContact));
    }

    return contactPortfolioDtoList;
  }
}
