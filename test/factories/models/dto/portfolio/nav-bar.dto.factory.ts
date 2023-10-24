import { NavBarDto } from '../../../../../src/models/dto/portfolio/nav-bar.dto';

export class NavBarDtoFactory {
  static build(name?: string, href?: string): NavBarDto {
    const navBarDto = new NavBarDto();
    navBarDto.name = name ?? 'Today';
    navBarDto.href = href ?? '#today';

    return navBarDto;
  }

  static buildList(size: number): NavBarDto[] {
    const navBarDtoList: NavBarDto[] = [];

    for (let i = 0; i < size; i++) {
      navBarDtoList.push(this.build());
    }

    return navBarDtoList;
  }
}
