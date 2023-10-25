import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLinkDto {
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
}
