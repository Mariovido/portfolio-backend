import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsDateString,
  IsDecimal,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateEducationDto {
  @IsAlpha()
  @ApiProperty()
  courseName: string;

  @IsString()
  @MaxLength(12)
  @ApiProperty()
  typeOfDegree: string;

  @IsAlpha()
  @ApiProperty()
  institute: string;

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
