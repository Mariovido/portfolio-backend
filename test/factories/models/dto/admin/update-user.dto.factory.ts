import { UpdateUserDto } from '../../../../../src/models/dto/admin/update-user.dto';

export class UpdateUserDtoFactory {
  static build(): UpdateUserDto {
    const updateUserDto = new UpdateUserDto();
    updateUserDto.firstName = 'testName';
    updateUserDto.lastName = 'name last';
    updateUserDto.dateOfBirth = new Date();
    updateUserDto.aboutMe = 'This is about me';

    return updateUserDto;
  }
}
