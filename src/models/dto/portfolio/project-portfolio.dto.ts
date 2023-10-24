import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

// TODO - RETOCAR
export class ProjectPortfolioDto {
  @IsString()
  @ApiProperty()
  projectName: string;

  @IsArray()
  @ApiProperty()
  technologies: string[];

  @IsArray()
  @ApiProperty()
  bulletPoints: string[];
}
