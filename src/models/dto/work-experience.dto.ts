import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsDate,
  IsOptional,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { LinkDto } from './link.dto';
import { TagDto } from './tag.dto';
import { BulletPointDto } from './bullet-point.dto';

export class WorkExperienceDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  role: string;

  @IsString()
  @ApiProperty()
  company: string;

  @IsUrl()
  @ApiProperty()
  companyLink: string;

  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  endDate?: Date;

  @IsArray()
  @Type(() => BulletPointDto)
  @ApiProperty()
  bulletPoints: BulletPointDto[];

  @IsArray()
  @Type(() => LinkDto)
  @ApiProperty()
  links?: LinkDto[];

  @IsArray()
  @Type(() => TagDto)
  @ApiProperty()
  tags?: TagDto[];

  @IsUUID()
  @ApiProperty()
  user: string;
}
