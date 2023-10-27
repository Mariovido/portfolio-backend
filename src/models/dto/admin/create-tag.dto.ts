import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsOptional, IsUUID, MaxLength } from 'class-validator';

export class CreateTagDto {
  @IsAlphanumeric()
  @MaxLength(30)
  @ApiProperty()
  tag: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  workExperience?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  project?: string;
}
