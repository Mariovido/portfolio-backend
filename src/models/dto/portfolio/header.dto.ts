import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsAlpha, IsArray, IsString } from 'class-validator';
import { LinkDto } from '../link.dto';
import { NavBarDto } from './nav-bar.dto';

export class HeaderDto {
  @IsAlpha()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  role: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsArray()
  @Type(() => NavBarDto)
  @ApiProperty()
  navBar: NavBarDto[];

  @IsArray()
  @Type(() => LinkDto)
  @ApiProperty()
  iconList: LinkDto[];
}
