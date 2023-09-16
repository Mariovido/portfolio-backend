import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class BulletPointDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @MaxLength(150)
  @ApiProperty()
  bulletPoint: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  workExperience?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  project?: string;
}
