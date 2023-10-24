import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsOptional, IsUUID } from 'class-validator';
import { LinkDto } from './link.dto';

export class ContactDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsArray()
  @IsOptional()
  @Type(() => LinkDto)
  links?: LinkDto[];

  @IsUUID()
  @ApiProperty()
  user: string;
}
