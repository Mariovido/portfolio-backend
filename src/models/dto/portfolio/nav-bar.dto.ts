import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NavBarDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  href: string;
}
