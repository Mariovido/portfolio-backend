import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsDateString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  username: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
    { message: 'password is too weak' },
  )
  @ApiProperty()
  password: string;

  @IsAlpha()
  @MaxLength(16)
  @ApiProperty()
  firstName: string;

  @IsString()
  @MaxLength(24)
  @ApiProperty()
  lastName: string;

  @IsDateString()
  @ApiProperty()
  dateOfBirth: Date;
}
