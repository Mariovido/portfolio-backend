import { PersonalInformationDto } from '../../../../../src/models/dto/portfolio/personal-information.dto';
import { User } from '../../../../../src/repositories/entities/user.entity';
import { calculateWorkExperience } from '../../../../../src/utils/portfolio.utils';

export class PersonalInformationDtoFactory {
  static build(mockUser: User): PersonalInformationDto {
    const personalInformation = new PersonalInformationDto();
    personalInformation.fullName = `${mockUser.firstName} ${mockUser.lastName}`;
    personalInformation.dateOfBirth = mockUser.dateOfBirth;

    const { years, months } = calculateWorkExperience(mockUser.workExperiences);
    const workExperience = `${years} years, ${months} months`;
    personalInformation.workExperience = workExperience;

    const education = mockUser.educations.slice().sort(function (a, b) {
      return b.startDate.getFullYear() - a.startDate.getFullYear();
    })[0].typeOfDegree;
    personalInformation.education = education;

    const interests = mockUser.interests.map(
      (interest) => interest.interestName,
    );
    personalInformation.interests = interests;
    personalInformation.aboutMe = mockUser.aboutMe;

    return personalInformation;
  }

  static buildList(size: number, mockUser: User): PersonalInformationDto[] {
    const personalInformationDtoList: PersonalInformationDto[] = [];

    for (let i = 0; i < size; i++) {
      personalInformationDtoList.push(this.build(mockUser));
    }

    return personalInformationDtoList;
  }
}
