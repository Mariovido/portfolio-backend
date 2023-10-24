import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsUUID } from 'class-validator';
import { ParagraphDto } from './paragraph.dto';

export class FooterDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsArray()
  @Type(() => ParagraphDto)
  paragraph: ParagraphDto[];

  @IsUUID()
  @ApiProperty()
  user: string;
}
