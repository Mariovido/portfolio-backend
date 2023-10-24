import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class LinkDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  tag?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsString()
  @ApiProperty()
  link: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  target?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  workExperience?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  paragraph?: string;
}
