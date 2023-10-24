import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsUUID } from 'class-validator';

// TODO - RETOCAR
export class ProjectDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  projectName: string;

  @IsArray()
  @ApiProperty()
  technologies: string[];

  @IsArray()
  @ApiProperty()
  bulletPoints: string[];

  @IsUUID()
  @ApiProperty()
  user: string;
}
