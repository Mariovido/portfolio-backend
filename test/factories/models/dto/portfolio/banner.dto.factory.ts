import { BannerDto } from '../../../../../src/models/dto/portfolio/banner.dto';
import { User } from '../../../../../src/repositories/entities/user.entity';

export class BannerDtoFactory {
  static build(mockUser: User): BannerDto {
    const bannerDto = new BannerDto();
    bannerDto.fullName = `${mockUser.firstName} ${mockUser.lastName}`;

    const role = mockUser.workExperiences.slice().sort(function (a, b) {
      return b.startDate.getFullYear() - a.startDate.getFullYear();
    })[0].role;
    bannerDto.role = role;

    return bannerDto;
  }

  static buildList(size: number, mockUser: User): BannerDto[] {
    const bannerDtoList: BannerDto[] = [];

    for (let i = 0; i < size; i++) {
      bannerDtoList.push(this.build(mockUser));
    }

    return bannerDtoList;
  }
}
