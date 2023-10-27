import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsUUID, IsUrl, IsOptional } from 'class-validator';
import { TagDto } from '../tag.dto';
import { Type } from 'class-transformer';
import { BulletPointDto } from '../bullet-point.dto';
import { LinkDto } from '../link.dto';

export class ProjectPortfolioDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  date: number;

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
