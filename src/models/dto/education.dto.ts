import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsDate,
  IsDecimal,
  IsOptional,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class EducationDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsAlpha()
  @ApiProperty()
  courseName: string;

  @IsAlpha()
  @ApiProperty()
  institute: string;

  @IsUrl()
  @ApiProperty()
  instituteLink: string;

  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  endDate?: Date;

  @IsDecimal()
  @IsOptional()
  @ApiProperty()
  grade?: number;

  @IsUUID()
  @ApiProperty()
  user: string;
}
