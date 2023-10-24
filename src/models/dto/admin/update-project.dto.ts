import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// TODO - RETOCAR
export class UpdateProjectDto {
  @IsString()
  @ApiProperty()
  projectName: string;
}
