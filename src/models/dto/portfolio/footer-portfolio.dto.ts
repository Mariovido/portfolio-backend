import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ParagraphDto } from '../paragraph.dto';
import { IsArray } from 'class-validator';

export class FooterPortfolioDto {
  @IsArray()
  @Type(() => ParagraphDto)
  @ApiProperty()
  paragraphs: ParagraphDto[];
}
