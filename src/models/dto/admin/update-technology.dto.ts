import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

// TODO - RETOCAR
export class UpdateTechnologyDto {
  @IsString()
  @MaxLength(30)
  @ApiProperty()
  technologyName: string;
}
