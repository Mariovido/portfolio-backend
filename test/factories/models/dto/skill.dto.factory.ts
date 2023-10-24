import { CreateSkillDto } from '../../../../src/models/dto/admin/create-skill.dto';
import { UpdateSkillDto } from '../../../../src/models/dto/admin/update-skill.dto';
import { SkillDto } from '../../../../src/models/dto/skill.dto';
import { Skill } from '../../../../src/repositories/entities/skill.entity';

export class SkillDtoFactory {
  static build(
    mockSkill: Skill,
    mockSkillUpdateDto?: CreateSkillDto | UpdateSkillDto,
  ): SkillDto {
    const skillDto = new SkillDto();
    skillDto.id = mockSkill.id;
    skillDto.skillName = mockSkillUpdateDto
      ? mockSkillUpdateDto.skillName
      : mockSkill.skillName;
    skillDto.rating = mockSkillUpdateDto
      ? mockSkillUpdateDto.rating
      : mockSkill.rating;
    skillDto.user = mockSkill.user.id;

    return skillDto;
  }

  static buildList(size: number, mockSkill: Skill): SkillDto[] {
    const skillDtoList: SkillDto[] = [];

    for (let i = 0; i < size; i++) {
      skillDtoList.push(this.build(mockSkill));
    }

    return skillDtoList;
  }

  static buildListBySkillList(mockSkillList: Skill[]): SkillDto[] {
    const skillDtoList: SkillDto[] = [];

    for (const skill of mockSkillList) {
      skillDtoList.push(this.build(skill));
    }

    return skillDtoList;
  }
}
