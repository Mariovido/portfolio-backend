import { UpdateSkillDto } from '../../../../../src/models/dto/admin/update-skill.dto';
import { LevelSkillEnum } from '../../../../../src/models/enums/LevelSkill.enum';

export class UpdateSkillDtoFactory {
  static build(): UpdateSkillDto {
    const updateSkillDto = new UpdateSkillDto();
    updateSkillDto.skillName = 'An old skill';
    updateSkillDto.level = LevelSkillEnum.Beginner;
    updateSkillDto.rating = 33;

    return updateSkillDto;
  }
}
