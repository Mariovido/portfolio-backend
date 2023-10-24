import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsUUID, MaxLength } from 'class-validator';

export class CreateTagDto {
  @IsAlphanumeric()
  @MaxLength(30)
  @ApiProperty()
  tag: string;

  @IsUUID()
  @ApiProperty()
  workExperience: string;
}
