import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateBulletPointDto {
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  bulletPoint: string;
}
