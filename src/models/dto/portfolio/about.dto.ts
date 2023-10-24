import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { ParagraphDto } from '../paragraph.dto';

export class AboutDto {
  @IsArray()
  @Type(() => ParagraphDto)
  @ApiProperty()
  paragraphs: ParagraphDto[];
}
