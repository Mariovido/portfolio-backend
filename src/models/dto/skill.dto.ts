import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';
import { LevelSkillEnum } from '../enums/LevelSkill.enum';

export class SkillDto {
  @IsUUID()
  @ApiProperty()
  id: string;

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

  @IsUUID()
  @ApiProperty()
  user: string;
}
