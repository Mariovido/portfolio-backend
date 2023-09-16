import { CreateInterestDto } from '../../../../src/models/dto/admin/create-interest.dto';
import { UpdateInterestDto } from '../../../../src/models/dto/admin/update-interest.dto';
import { InterestDto } from '../../../../src/models/dto/interest.dto';
import { Interest } from '../../../../src/repositories/entities/interest.entity';

export class InterestDtoFactory {
  static build(
    mockInterest: Interest,
    mockInterestUpdateDto?: CreateInterestDto | UpdateInterestDto,
  ): InterestDto {
    const interestDto = new InterestDto();
    interestDto.id = mockInterest.id;
    interestDto.interestName = mockInterestUpdateDto
      ? mockInterestUpdateDto.interestName
      : mockInterest.interestName;
    interestDto.user = mockInterest.user.id;

    return interestDto;
  }

  static buildList(size: number, mockInterest: Interest): InterestDto[] {
    const interestDtoList: InterestDto[] = [];

    for (let i = 0; i < size; i++) {
      interestDtoList.push(this.build(mockInterest));
    }

    return interestDtoList;
  }

  static buildListByInterestList(mockInterestList: Interest[]): InterestDto[] {
    const interestDtoList: InterestDto[] = [];

    for (const interest of mockInterestList) {
      interestDtoList.push(this.build(interest));
    }

    return interestDtoList;
  }
}
