import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { LinkDto } from './link.dto';
import { Type } from 'class-transformer';

export class ParagraphDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  paragraph: string;

  @IsNumber()
  @ApiProperty()
  order: number;

  @IsArray()
  @Type(() => LinkDto)
  links?: LinkDto[];

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  user?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  footer?: string;
}
