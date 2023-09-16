import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateWorkExperienceDto {
  @IsString()
  @ApiProperty()
  role: string;

  @IsString()
  @ApiProperty()
  company: string;

  @IsDateString()
  @ApiProperty()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  endDate?: Date;
}
