import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsDateString,
  IsDecimal,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateEducationDto {
  @IsAlpha()
  @ApiProperty()
  courseName: string;

  @IsAlpha()
  @ApiProperty()
  institute: string;

  @IsUrl()
  @ApiProperty()
  instituteLink: string;

  @IsDateString()
  @ApiProperty()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  endDate?: Date;

  @IsDecimal()
  @IsOptional()
  @ApiProperty()
  grade?: number;
}
