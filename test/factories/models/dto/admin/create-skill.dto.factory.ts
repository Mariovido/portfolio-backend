import { CreateSkillDto } from '../../../../../src/models/dto/admin/create-skill.dto';
import { LevelSkillEnum } from '../../../../../src/models/enums/LevelSkill.enum';

export class CreateSkillDtoFactory {
  static build(): CreateSkillDto {
    const createSkillDto = new CreateSkillDto();
    createSkillDto.skillName = 'A new skill';
    createSkillDto.level = LevelSkillEnum.Expert;
    createSkillDto.rating = 88;

    return createSkillDto;
  }
}
