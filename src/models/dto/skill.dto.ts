import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';

export class SkillDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  skillName: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiProperty()
  rating: number;

  @IsUUID()
  @ApiProperty()
  user: string;
}
