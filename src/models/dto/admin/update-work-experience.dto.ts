import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateWorkExperienceDto {
  @IsString()
  @ApiProperty()
  role: string;

  @IsString()
  @ApiProperty()
  company: string;

  @IsUrl()
  @ApiProperty()
  companyLink: string;

  @IsDateString()
  @ApiProperty()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  endDate?: Date;
}
