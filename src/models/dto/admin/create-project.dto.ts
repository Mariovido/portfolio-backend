import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// TODO - RETOCAR
export class CreateProjectDto {
  @IsString()
  @ApiProperty()
  projectName: string;
}
