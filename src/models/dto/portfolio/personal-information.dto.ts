import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsAlphanumeric,
  IsArray,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';

export class PersonalInformationDto {
  @IsAlpha()
  @ApiProperty()
  fullName: string;

  @IsDate()
  @ApiProperty()
  dateOfBirth: Date;

  @IsString()
  @ApiProperty()
  workExperience: string;

  @IsAlpha()
  @ApiProperty()
  education: string;

  @IsArray()
  @ApiProperty()
  interests: string[];

  @IsAlphanumeric()
  @IsOptional()
  @ApiProperty()
  aboutMe?: string;
}
