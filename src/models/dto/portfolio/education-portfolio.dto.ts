import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsDate, IsDecimal, IsOptional } from 'class-validator';

export class EducationPortfolioDto {
  @IsAlpha()
  @ApiProperty()
  courseName: string;

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
}
