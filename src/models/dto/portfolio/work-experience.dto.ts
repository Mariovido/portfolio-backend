import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDate, IsOptional } from 'class-validator';

export class WorkExperiencePortfolioDto {
  @IsString()
  @ApiProperty()
  role: string;

  @IsString()
  @ApiProperty()
  company: string;

  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  endDate?: Date;

  @IsArray()
  @ApiProperty()
  bulletPoints: string[];
}
