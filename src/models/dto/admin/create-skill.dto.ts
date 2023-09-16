import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, Max, Min } from 'class-validator';
import { LevelSkillEnum } from '../../enums/LevelSkill.enum';

export class CreateSkillDto {
  @IsString()
  @ApiProperty()
  skillName: string;

  @IsEnum(LevelSkillEnum)
  @ApiProperty()
  level: LevelSkillEnum;

  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiProperty()
  rating: number;
}
