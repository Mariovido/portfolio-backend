import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { InterestDto } from './interest.dto';
import { EducationDto } from './education.dto';
import { WorkExperienceDto } from './work-experience.dto';
import { SkillDto } from './skill.dto';
import { ProjectDto } from './project.dto';
import { ContactDto } from './contact.dto';

export class UserDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  username: string;

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
  @IsOptional()
  @ApiProperty()
  aboutMe?: string;

  @IsArray()
  @Type(() => InterestDto)
  interests: InterestDto[];

  @IsArray()
  @Type(() => EducationDto)
  educations: EducationDto[];

  @IsArray()
  @Type(() => WorkExperienceDto)
  workExperiences: WorkExperienceDto[];

  @IsArray()
  @Type(() => SkillDto)
  skills: SkillDto[];

  @IsArray()
  @Type(() => ProjectDto)
  projects: ProjectDto[];

  @IsArray()
  @Type(() => ContactDto)
  contact: ContactDto;
}
