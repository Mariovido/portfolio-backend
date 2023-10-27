import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class TagDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
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
