import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength } from 'class-validator';

export class TechnologyDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @MaxLength(30)
  @ApiProperty()
  technologyName: string;

  @IsUUID()
  @ApiProperty()
  project: string;
}
