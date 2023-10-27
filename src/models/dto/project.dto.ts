import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsUUID,
  IsBoolean,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { TagDto } from './tag.dto';
import { Type } from 'class-transformer';
import { LinkDto } from './link.dto';
import { BulletPointDto } from './bullet-point.dto';

export class ProjectDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  date: Date;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  subtitle: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  projectLink?: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  imageLink?: string;

  @IsBoolean()
  @ApiProperty()
  isDisplayed: boolean;

  @IsArray()
  @Type(() => BulletPointDto)
  @ApiProperty()
  bulletPoints: BulletPointDto[];

  @IsArray()
  @Type(() => LinkDto)
  @IsOptional()
  @ApiProperty()
  links?: LinkDto[];

  @IsArray()
  @Type(() => TagDto)
  @IsOptional()
  @ApiProperty()
  tags?: TagDto[];

  @IsUUID()
  @ApiProperty()
  user: string;
}
