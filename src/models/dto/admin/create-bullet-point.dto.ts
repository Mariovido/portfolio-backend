import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateBulletPointDto {
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
