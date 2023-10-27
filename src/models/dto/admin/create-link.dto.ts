import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLinkDto {
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

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  contact?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  project?: string;
}
