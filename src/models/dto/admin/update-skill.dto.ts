import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateSkillDto {
  @IsString()
  @ApiProperty()
  skillName: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiProperty()
  rating: number;
}
