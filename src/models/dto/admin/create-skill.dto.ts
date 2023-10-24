import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @ApiProperty()
  skillName: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiProperty()
  rating: number;
}
