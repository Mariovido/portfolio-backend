import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Max, Min, IsUUID } from 'class-validator';

export class SkillPortfolioDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiProperty()
  progress: number;
}
