import { UpdateUserDto } from '../../../../src/models/dto/admin/update-user.dto';
import { UserDto } from '../../../../src/models/dto/user.dto';
import { User } from '../../../../src/repositories/entities/user.entity';

export class UserDtoFactory {
  static build(mockUser: User, mockUpdateUser?: UpdateUserDto): UserDto {
    const userDto = new UserDto();
    userDto.id = mockUser.id;
    userDto.username = mockUser.username;
    userDto.firstName = mockUpdateUser
      ? mockUpdateUser.firstName
      : mockUser.firstName;
    userDto.lastName = mockUpdateUser
      ? mockUpdateUser.lastName
      : mockUser.lastName;
    userDto.dateOfBirth = mockUpdateUser
      ? mockUpdateUser.dateOfBirth
      : mockUser.dateOfBirth;
    userDto.description = mockUpdateUser
      ? mockUpdateUser.description
      : mockUser.description;

    return userDto;
  }

  static buildList(size: number, mockUser: User): UserDto[] {
    const userDtoList: UserDto[] = [];

    for (let i = 0; i < size; i++) {
      userDtoList.push(this.build(mockUser));
    }

    return userDtoList;
  }

  static buildListByUserList(mockUserList: User[]): UserDto[] {
    const userDtoList: UserDto[] = [];

    for (const user of mockUserList) {
      userDtoList.push(this.build(user));
    }

    return userDtoList;
  }
}
