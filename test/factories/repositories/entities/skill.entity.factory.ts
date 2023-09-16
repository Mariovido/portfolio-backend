import { LevelSkillEnum } from '../../../../src/models/enums/LevelSkill.enum';
import { Skill } from '../../../../src/repositories/entities/skill.entity';
import { User } from '../../../../src/repositories/entities/user.entity';

export class SkillFactory {
  static build(): Skill {
    const skill = new Skill();
    skill.id = '61bbd5eb-6c5f-454e-9b78-19a9342bb1a1';
    skill.skillName = 'off';
    skill.level = LevelSkillEnum.Advanced;
    skill.rating = 79;
    skill.user = new User();

    return skill;
  }

  static buildList(size: number): Skill[] {
    const skillList: Skill[] = [];

    for (let i = 0; i < size; i++) {
      skillList.push(this.build());
    }

    return skillList;
  }
}
