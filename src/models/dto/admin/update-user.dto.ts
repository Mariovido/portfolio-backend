import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsDateString, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
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

  @IsString()
  @MaxLength(1000)
  @ApiProperty()
  aboutMe: string;
}
