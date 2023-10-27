import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @IsDateString()
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
}
