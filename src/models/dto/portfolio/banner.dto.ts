import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsAlphanumeric } from 'class-validator';

export class BannerDto {
  @IsAlpha()
  @ApiProperty()
  fullName: string;

  @IsAlphanumeric()
  @ApiProperty()
  role: string;
}
