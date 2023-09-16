import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDate, IsOptional, IsUUID } from 'class-validator';

export class WorkExperienceDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  role: string;

  @IsString()
  @ApiProperty()
  company: string;

  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  endDate?: Date;

  @IsArray()
  @ApiProperty()
  bulletPoints: string[];

  @IsUUID()
  @ApiProperty()
  user: string;
}
