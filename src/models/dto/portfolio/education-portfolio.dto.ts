import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsString, IsUUID } from 'class-validator';

export class EducationPortfolioDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsAlpha()
  @ApiProperty()
  name: string;

  @IsAlpha()
  @ApiProperty()
  university: string;

  @IsString()
  @ApiProperty()
  date: string;

  @IsString()
  @ApiProperty()
  universityLink: string;
}
