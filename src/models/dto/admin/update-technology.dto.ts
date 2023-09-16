import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateTechnologyDto {
  @IsString()
  @MaxLength(30)
  @ApiProperty()
  technologyName: string;
}
