import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class UpdateTagDto {
  @IsAlphanumeric()
  @MaxLength(30)
  @ApiProperty()
  tag: string;
}
