import { LinkDto } from '../../../../../src/models/dto/link.dto';
import { HeaderDto } from '../../../../../src/models/dto/portfolio/header.dto';
import { NavBarDto } from '../../../../../src/models/dto/portfolio/nav-bar.dto';
import { User } from '../../../../../src/repositories/entities/user.entity';
import { NavBarDtoFactory } from './nav-bar.dto.factory';

export class HeaderDtoFactory {
  static build(mockUser: User): HeaderDto {
    const headerDto = new HeaderDto();
    const name = `${mockUser.firstName} ${mockUser.lastName}`;
    headerDto.name = name;

    const lastExperience = mockUser.workExperiences.slice().sort((a, b) => {
      return b.startDate.getFullYear() - a.startDate.getFullYear();
    })[0];
    const role = `${lastExperience.role} at ${lastExperience.company}`;
    headerDto.role = role;

    headerDto.description = mockUser.description;

    const navBarList: NavBarDto[] = [];
    if (mockUser.about.length > 0) {
      navBarList.push(NavBarDtoFactory.build('About', '#about'));
    }
    if (mockUser.workExperiences.length > 0) {
      navBarList.push(NavBarDtoFactory.build('Experience', '#experience'));
    }
    if (mockUser.educations.length > 0) {
      navBarList.push(NavBarDtoFactory.build('Education', '#education'));
    }
    if (mockUser.skills.length > 0) {
      navBarList.push(NavBarDtoFactory.build('Skill', '#skill'));
    }
    headerDto.navBar = navBarList;

    const iconList = mockUser.contact.links.map((link) => {
      const linkDto = new LinkDto();
      linkDto.id = link.id;
      linkDto.name = link.name;
      linkDto.link = link.link;
      linkDto.target = link.target;

      return linkDto;
    });
    headerDto.iconList = iconList;

    return headerDto;
  }

  static buildList(size: number, mockUser: User): HeaderDto[] {
    const headerDtoList: HeaderDto[] = [];

    for (let i = 0; i < size; i++) {
      headerDtoList.push(this.build(mockUser));
    }

    return headerDtoList;
  }
}
