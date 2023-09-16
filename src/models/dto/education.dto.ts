import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsDate,
  IsDecimal,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class EducationDto {
  @IsUUID()
  @ApiProperty()
  id: string;

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
