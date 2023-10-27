import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsUUID, IsOptional, IsUrl } from 'class-validator';
import { BulletPointDto } from '../bullet-point.dto';
import { Type } from 'class-transformer';
import { LinkDto } from '../link.dto';
import { TagDto } from '../tag.dto';

export class WorkExperiencePortfolioDto {
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
  companyLink?: string;

  @IsString()
  @ApiProperty()
  date: string;

  @IsArray()
  @Type(() => BulletPointDto)
  @ApiProperty()
  description: BulletPointDto[];

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
}
